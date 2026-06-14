import { shaderMaterial, useTexture } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'

import vertexShader from './shaders/grass/vertex.glsl'
import fragmentShader from './shaders/grass/fragment.glsl'
import { SEASONS, useStencil } from './utils/stencilBuffer'

const GrassBladeMaterial = shaderMaterial(
    {
        uTime: 0,
        uEdgeColor: new THREE.Color('#99C460'),
        uCenterColor: new THREE.Color('#6f8f46'),
        uAlphaMap: null,
    },
    vertexShader,
    fragmentShader
)

extend({ GrassBladeMaterial })

const MIN_BLADE_SCALE = 0.8
const MAX_BLADE_SCALE = 1.2

export function GrassField({ positions }) {
    const stencil = useStencil(SEASONS.spring)
    const meshRef = useRef(null)
    const materialRef = useRef(null)
    const bladeAlphaMap = useTexture('./textures/grassBlade/blade_alpha.jpg')

    const { count, matrices, phaseOffsets } = useMemo(() => {
        const count = positions.length

        console.log({ count })

        const phaseOffsets = new Float32Array(count)
        const matrices = []
        const matrix = new THREE.Matrix4()
        const position = new THREE.Vector3()
        const quaternion = new THREE.Quaternion()
        const rotation = new THREE.Euler()
        const scale = new THREE.Vector3()

        for (let i = 0; i < count; i++) {
            const [x, y, z] = positions[i]
            position.set(x, y, z)

            // eslint-disable-next-line
            rotation.set(0, Math.random() * Math.PI * 2, 0)

            quaternion.setFromEuler(rotation)

            const uniformScale =
                MIN_BLADE_SCALE +
                // eslint-disable-next-line
                Math.random() * (MAX_BLADE_SCALE - MIN_BLADE_SCALE)

            scale.set(uniformScale, uniformScale, uniformScale)

            matrix.compose(position, quaternion, scale)

            matrices.push(matrix.clone())

            // eslint-disable-next-line
            phaseOffsets[i] = Math.random() * Math.PI * 2
        }

        return { count, matrices, phaseOffsets }
    }, [positions])

    useEffect(() => {
        const mesh = meshRef.current
        if (!mesh) return

        for (let i = 0; i < count; i++) {
            mesh.setMatrixAt(i, matrices[i])
        }
        mesh.instanceMatrix.needsUpdate = true

        mesh.geometry.setAttribute(
            'aPhaseOffset',
            new THREE.InstancedBufferAttribute(phaseOffsets, 1)
        )
    }, [count, matrices, phaseOffsets])

    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <planeGeometry args={[0.01, 0.1]} />
            <grassBladeMaterial
                key={GrassBladeMaterial.key}
                ref={materialRef}
                uAlphaMap={bladeAlphaMap}
                side={THREE.DoubleSide}
                {...stencil}
            />
        </instancedMesh>
    )
}

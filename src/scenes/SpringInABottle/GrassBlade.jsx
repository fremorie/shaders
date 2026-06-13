import { shaderMaterial, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'

import vertexShader from './shaders/grass/vertex.glsl'
import fragmentShader from './shaders/grass/fragment.glsl'
import { SEASONS, useStencil } from './utils/stencilBuffer'

const GrassBladeMaterial = shaderMaterial(
    {
        uTime: 0,
        uEdgeColor: new THREE.Color('#99C460FF'),
        uCenterColor: new THREE.Color('#6f8f46'),
        uAlphaMap: null,
    },
    vertexShader,
    fragmentShader
)

extend({ GrassBladeMaterial })

export function GrassBlade({ position, scale, rotationY }) {
    const stencil = useStencil(SEASONS.spring)

    const grassBladeMaterialRef = useRef(null)
    const bladeAlphaMap = useTexture('./textures/grassBlade/blade_alpha.jpg')

    useFrame((state, delta) => {
        if (grassBladeMaterialRef.current) {
            grassBladeMaterialRef.current.uTime += delta
        }
    })

    return (
        <mesh position={position} scale={scale} rotation-y={rotationY}>
            <planeGeometry args={[0.01, 0.1]} />
            <grassBladeMaterial
                key={GrassBladeMaterial.key}
                ref={grassBladeMaterialRef}
                uAlphaMap={bladeAlphaMap}
                side={THREE.DoubleSide}
                {...stencil}
            />
        </mesh>
    )
}

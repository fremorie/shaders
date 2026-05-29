import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import fragmentShader from '../../shaders/ragingSea/fragment.glsl'
import vertexShader from '../../shaders/ragingSea/vertex.glsl'

export function RagingSeaShader({ store }) {
    const materialRef = useRef()

    const { depthColor, surfaceColor } = useControls(
        {
            depthColor: '#186691',
            surfaceColor: '#9bd8ff',
        },
        { store }
    )

    const uniforms = useMemo(
        () => ({
            uBigWavesElevation: { value: 0.2 },
            uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
            uBigWavesSpeed: { value: 0.75 },

            uSmallWavesElevation: { value: 0.15 },
            uSmallWavesFrequency: { value: 3 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallWavesIterations: { value: 4 },

            uTime: { value: 0 },

            uDepthColor: { value: new THREE.Color() },
            uSurfaceColor: { value: new THREE.Color() },
            uColorOffset: { value: 0.08 },
            uColorMultiplier: { value: 5 },
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uDepthColor.value.set(depthColor)
            materialRef.current.uniforms.uSurfaceColor.value.set(surfaceColor)
        }
    }, [depthColor, surfaceColor])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[2, 2, 512, 512]} />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

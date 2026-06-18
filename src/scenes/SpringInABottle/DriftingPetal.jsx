import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useRef } from 'react'

import vertexShader from './shaders/driftingPetal/vertex.glsl'
import fragmentShader from './shaders/driftingPetal/fragment.glsl'
import { SEASONS, useStencil } from './utils/stencilBuffer'

const DriftingPetalMaterial = shaderMaterial(
    {
        uTime: 0,
        uPerlinNoise: null,
        uTexture: null,
    },
    vertexShader,
    fragmentShader
)

extend({ DriftingPetalMaterial })

export function DriftingPetal() {
    const stencil = useStencil(SEASONS.spring)
    const petalTexture = useTexture('./textures/petal/petal.png')
    const driftingPetalMaterialRef = useRef(null)

    return (
        <mesh
            position-y={0.51}
            position-x={-0.3}
            rotation-x={-Math.PI / 2}
            scale={0.2}
        >
            <planeGeometry />
            <driftingPetalMaterial
                key={DriftingPetalMaterial}
                ref={driftingPetalMaterialRef}
                uTexture={petalTexture}
                {...stencil}
            />
        </mesh>
    )
}

import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { shaderMaterial, useMask, useTexture } from '@react-three/drei'

import vertexShader from './shaders/snowflakes/vertex.glsl'
import fragmentShader from './shaders/snowflakes/fragment.glsl'

const SnowflakeMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: null,
    },
    vertexShader,
    fragmentShader
)

extend({ SnowflakeMaterial })

const particlesCount = 100
const particlePositions = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3

    particlePositions[i3] = Math.random()
    particlePositions[i3 + 1] = Math.random()
    particlePositions[i3 + 2] = Math.random()
}

export function Snowflakes() {
    const stencil = useMask(1)
    const snowflakeTexture = useTexture('./textures/snowflake.png')

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    itemSize={3}
                    array={particlePositions}
                />
            </bufferGeometry>
            <snowflakeMaterial
                key={SnowflakeMaterial.key}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uTexture={snowflakeTexture}
                {...stencil}
            />
        </points>
    )
}

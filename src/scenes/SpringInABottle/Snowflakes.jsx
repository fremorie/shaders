import { shaderMaterial, useMask } from '@react-three/drei'
import * as THREE from 'three'
import vertexShader from './shaders/river/vertex.glsl'
import fragmentShader from './shaders/river/fragment.glsl'
import { extend } from '@react-three/fiber'

const SnowflakeMaterial = shaderMaterial(
    {
        uTime: 0,
        uEdgeColor: new THREE.Color('#dbd497'),
        uDepthColor: new THREE.Color('#23938a'),
        uDepthMap: null,
        uPerlinNoise: null,
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
            <pointsMaterial
                size={0.04}
                color="#ffffff"
                transparent
                {...stencil}
            />
        </points>
    )
}

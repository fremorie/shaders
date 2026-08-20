import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { useRef } from 'react'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const WarpedSphereMaterial = shaderMaterial(
    { time: 0 },
    vertexShader,
    fragmentShader
)

extend({ WarpedSphereMaterial })

export function WarpedSphere() {
    const materialRef = useRef(null)

    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.time += delta
        }
    })

    return (
        <mesh>
            <icosahedronGeometry args={[1, 128]} />
            <warpedSphereMaterial
                ref={materialRef}
                key={WarpedSphereMaterial.key}
            />
        </mesh>
    )
}

import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from '../../shaders/gradient/vertex.glsl'
import fragmentShader from '../../shaders/gradient/fragment.glsl'

export function GradientShader() {
    const materialRef = useRef(null)
    const { width, height } = useThree((state) => state.viewport)

    return (
        <mesh scale={[width, height, 1]}>
            <planeGeometry />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    )
}

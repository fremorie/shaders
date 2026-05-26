import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { GradientShader } from './GradientShader'

export function GradientShaderPage() {
    return (
        <Canvas>
            <GradientShader />
            <OrthographicCamera makeDefault position={[0, 0, 1]} />
        </Canvas>
    )
}

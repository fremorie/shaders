import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { GradientStripesShader } from './GradientStripesShader'

export function GradientStripesShaderPage() {
    return (
        <>
            <Canvas>
                <GradientStripesShader />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}

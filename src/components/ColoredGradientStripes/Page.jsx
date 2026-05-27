import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { ColoredGradientStripesShader } from './ColoredGradientStripesShader'

export function ColoredGradientStripesShaderPage() {
    return (
        <>
            <Canvas>
                <ColoredGradientStripesShader />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}

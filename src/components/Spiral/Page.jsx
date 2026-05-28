import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'

import { SpiralShader } from './SpiralShader'

export function SpiralShaderPage() {
    return (
        <>
            <Canvas>
                <SpiralShader />
                <OrthographicCamera makeDefault position={[0, 0, 1]} />
            </Canvas>
        </>
    )
}

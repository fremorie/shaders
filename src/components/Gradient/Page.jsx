import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { GradientShader } from './GradientShader'

export function GradientShaderPage() {
    return (
        <Canvas>
            <Perf position="top-left" />
            <GradientShader />
            <OrthographicCamera makeDefault position={[0, 0, 1]} />
        </Canvas>
    )
}

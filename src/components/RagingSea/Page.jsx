import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { RagingSeaShader } from './RagingSeaShader'

export function RagingSeaPage() {
    return (
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 2, 2, 2 ]
            } }
        >
            <Perf position="top-left" />
            <OrbitControls makeDefault />
            <RagingSeaShader />
        </Canvas>
    )
}
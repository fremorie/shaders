import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { RagingSeaShader } from './RagingSeaShader'

export function RagingSeaPage() {
    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                fov={45}
                near={0.1}
                far={200}
                position={[2, 2, 2]}
            />
            <OrbitControls makeDefault />
            <RagingSeaShader />
        </Canvas>
    )
}

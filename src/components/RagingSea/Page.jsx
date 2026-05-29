import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { RagingSeaShader } from './RagingSeaShader'

export function RagingSeaPage() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    near={0.1}
                    far={200}
                    position={[2, 2, 2]}
                />
                <color args={['#05151d']} attach="background" />
                <OrbitControls makeDefault />
                <RagingSeaShader store={store} />
            </Canvas>
        </>
    )
}

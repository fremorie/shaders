import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { WarpedSphere } from './WarpedSphere'

export function WarpedSpherePage() {
    const store = useCreateStore()

    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <OrbitControls makeDefault />
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    near={0.1}
                    far={200}
                    position={[5, 0, 4]}
                />

                <WarpedSphere store={store} />
            </Canvas>
        </>
    )
}

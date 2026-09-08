import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'

import { Monster } from './Monster'

export function MonsterPage() {
    const store = useCreateStore()

    return (
        <>
            <LevaPanel store={store} />
            <Canvas>
                <color args={['#ffffff']} attach="background" />
                <OrbitControls makeDefault />
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    near={0.1}
                    far={200}
                    position={[5, 0, 4]}
                />

                <Monster store={store} />
            </Canvas>
        </>
    )
}

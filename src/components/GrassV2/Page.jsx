import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'
import { Perf } from 'r3f-perf'

import { Grass } from './Grass'
import { Explanation } from '../layout/Explanation/Explanation'

export function GrassV2Page() {
    const store = useCreateStore()
    return (
        <>
            <LevaPanel
                store={store}
                theme={{
                    sizes: { rootWidth: '350px', numberInputMinWidth: '60px' },
                }}
            />
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    near={0.1}
                    far={200}
                    position={[3.8, 1.6, -1.5]}
                />
                <color args={['#05151d']} attach="background" />
                <OrbitControls makeDefault target={[0, 1.2, 0]} />
                <Grass store={store} />
                <Sky />
                <Perf position="bottom-left" />
            </Canvas>
        </>
    )
}

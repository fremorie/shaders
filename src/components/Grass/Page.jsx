import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei'
import { useCreateStore, LevaPanel } from 'leva'
import { Perf } from 'r3f-perf'

import { Grass } from './Grass'
import { Explanation } from '../layout/Explanation/Explanation'

export function GrassPage() {
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
            <Explanation title="Credits">
                <p>
                    Grass alpha texture adapted from the PMNDRS examples
                    repository (MIT License).
                </p>

                <a
                    target="_blank"
                    href="https://github.com/pmndrs/examples/blob/main/demos/grass-shader/src/resources/blade_alpha.jpg"
                >
                    Source
                </a>
            </Explanation>
        </>
    )
}

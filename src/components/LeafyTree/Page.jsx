import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { LevaPanel, useCreateStore } from 'leva'
import { Perf } from 'r3f-perf'

import { Tree } from './Tree'
import { Ground } from './Ground'
import { Explanation } from '../layout/Explanation/Explanation'
import { Environment } from './Environment'

import { Birch } from './Birch'

export function TreePage() {
    const store = useCreateStore()

    return (
        <>
            <LevaPanel
                hidden={false}
                store={store}
                theme={{ sizes: { rootWidth: '350px' } }}
            />
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-15, 5, 6],
                }}
                shadows
            >
                <color args={['#ffffff']} attach="background" />

                <OrbitControls makeDefault />

                <Environment debug={false} store={store} />

                <Tree store={store} />
                <Birch store={store} />
                <Ground />

                <Perf position="bottom-left" />
            </Canvas>
            <Explanation title="Credits">
                <ul>
                    <li>
                        Inspired by{' '}
                        <a
                            target="_blank"
                            href="https://youtu.be/cesPK0kYkyE?si=lZsxgFWYpX_o_CF5&t=54"
                        >
                            Bruno Simon's video
                        </a>
                    </li>
                    <li>
                        Tree normal map:&nbsp;
                        <a
                            target="_blank"
                            href="https://polyhaven.com/a/bark_willow_02"
                        >
                            Bark willow by Charlotte Baglioni
                        </a>
                    </li>
                </ul>
            </Explanation>
        </>
    )
}

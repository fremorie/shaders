import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { LevaPanel, useCreateStore } from 'leva'
import { Perf } from 'r3f-perf'

import { Oak } from './Oak'
import { Ground } from './Ground'
import { Explanation } from '../layout/Explanation/Explanation'
import { Environment } from './Environment'

import { Birch } from './Birch'
import { Maple } from './Maple'

export function LeafyTreesFrontSidePage() {
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
                    position: [0, 7, 30],
                }}
                shadows
            >
                <color args={['#ffffff']} attach="background" />

                <OrbitControls makeDefault />

                <Environment debug={false} store={store} />

                <Birch store={store} />
                <Oak store={store} />
                <Maple store={store} />

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
                        Birch model:&nbsp;
                        <a
                            target="_blank"
                            href="https://poly.pizza/m/RieYOsjDj8"
                        >
                            Birch Tree Dead by Quaternius
                        </a>&nbsp; (edited)
                    </li>
                    <li>
                        Oak tree trunk:&nbsp;
                        <a
                            target="_blank"
                            href="https://poly.pizza/m/1BkD9JnKrE"
                        >
                            Tree by Quaternius
                        </a>&nbsp; (edited)
                    </li>
                    <li>
                        Maple tree trunk:&nbsp;
                        <a
                            target="_blank"
                            href="https://poly.pizza/m/b0boebSV1r"
                        >
                            Another tree by Quaternius
                        </a>&nbsp; (edited)
                    </li>
                </ul>
            </Explanation>
        </>
    )
}

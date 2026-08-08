import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Leva } from 'leva'

import { Tree } from './Tree'
import { Ground } from './Ground'
import { Explanation } from '../layout/Explanation/Explanation'
import { Environment } from './Environment'
import { Perf } from 'r3f-perf'

export function TreePage() {
    return (
        <>
            <Leva hidden={false} />
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

                <Environment debug={false} />

                <Tree />
                <Ground />

                <Perf position="bottom-left" />
            </Canvas>
            <Explanation title="Credits">
                <p>Inspired by Bruno Simon's video:</p>

                <p>
                    <a
                        target="_blank"
                        href="https://youtu.be/cesPK0kYkyE?si=lZsxgFWYpX_o_CF5&t=54"
                    >
                        https://youtu.be/cesPK0kYkyE?si=lZsxgFWYpX_o_CF5&t=54
                    </a>
                </p>
            </Explanation>
        </>
    )
}

import { LevaPanel, useCreateStore } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

import { Experience } from './Experience'
import { CAMERA_POSITION } from './utils/camera'
import { useDebug } from './hooks/useDebug'
import { Explanation } from '../../components/layout/Explanation/Explanation'

export function SpringInABottle() {
    const debug = useDebug()
    const store = useCreateStore()

    return (
        <>
            <LevaPanel store={store} hidden={!debug} />

            <Canvas
                flat
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: CAMERA_POSITION.initial,
                }}
                gl={{ stencil: true }}
            >
                <OrbitControls
                    makeDefault
                    maxDistance={10}
                    minDistance={2}
                    target={[0, 1.2, 0]}
                />

                {debug && <Perf position="bottom-right" />}

                {debug && <axesHelper args={[2]} />}

                <Suspense fallback={null}>
                    <Experience store={store} />
                </Suspense>
            </Canvas>

            <Loader />

            <Explanation title="Credits">
                <ul>
                    <li>
                        <b>Snowflake texture:&nbsp;</b>
                        <a
                            target="_blank"
                            href="https://kenney.nl/assets/particle-pack"
                        >
                            Kenney Particle Pack
                        </a>
                    </li>
                    <li>
                        <b>Environment map:&nbsp;</b>
                        <a
                            target="_blank"
                            href="https://polyhaven.com/a/venice_sunset"
                        >
                            Venice Sunset by Greg Zaal
                        </a>
                    </li>
                    <li>
                        <b>Perlin noise texture:&nbsp;</b>
                        Created with{' '}
                        <a
                            target="_blank"
                            href="https://github.com/blackears/PerlinNoiseMaker"
                        >
                            Perlin Noise Maker
                        </a>
                    </li>
                    <li>
                        <b>Cherry blossom petal texture:</b> AI-generated
                    </li>
                </ul>
            </Explanation>
        </>
    )
}

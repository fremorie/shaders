import { LevaPanel, useCreateStore } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

import { Experience } from './Experience'
import { FadeIn } from './FadeIn'
import { CAMERA_POSITION } from './utils/camera'
import { useDebug } from './hooks/useDebug'
import { Explanation } from '../../components/layout/Explanation/Explanation'

export function SpringInABottle() {
    const debug = useDebug()
    const store = useCreateStore()

    return (
        <>
            <LevaPanel
                store={store}
                hidden={!debug}
                theme={{ sizes: { rootWidth: '350px' } }}
            />

            <Canvas
                flat
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 31,
                    position: CAMERA_POSITION.initial,
                }}
                gl={{ stencil: true }}
            >
                <OrbitControls
                    makeDefault
                    maxDistance={30}
                    minDistance={2}
                    target={[0, 1.2, 0]}
                />

                {debug && <Perf position="bottom-left" />}

                {debug && <axesHelper args={[2]} />}

                <Suspense fallback={null}>
                    <Experience store={store} />
                </Suspense>
            </Canvas>

            <FadeIn />

            <Loader
                containerStyles={{
                    zIndex: 2,
                }}
            />

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
                        <b>Cherry blossom petal texture:</b> AI-generated
                    </li>
                    <li>
                        <b>Ring matcap texture:&nbsp;</b>
                        <a
                            target="_blank"
                            href="https://github.com/nidorx/matcaps/blob/1b1e43a338335b6401034d48488298966755d717/PAGE-4.md#331a0b_b17038_7d4e28_5b351a"
                        >
                            nidorx/matcaps
                        </a>
                        <br />
                        <i>(original author unknown)</i>
                    </li>
                    <li>
                        <b>Voronoi 3d implementation:&nbsp;</b>
                        <a
                            target="_blank"
                            href="https://github.com/MaxBittker/glsl-voronoi-noise/blob/76089081d7154629eec8641fe12e7642b56f4312/3d.glsl#L17"
                        >
                            MaxBittker/glsl-voronoi-noise
                        </a>
                    </li>
                </ul>
            </Explanation>
        </>
    )
}

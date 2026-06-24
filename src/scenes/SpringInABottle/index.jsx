import { LevaPanel, useCreateStore } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

import { Experience } from './Experience'
import { FadeIn } from './FadeIn'
import { StartScreen } from './StartScreen'
import { CAMERA_POSITION } from './utils/camera'
import { useDebug } from './hooks/useDebug'
import { useCrossfadeLoop } from './hooks/useCrossfadeLoop'
import useSceneState from './store/useSceneState'
import { Credits } from './Credits'

const MUSIC_URL = './sounds/ambientMusic/ambientMusic.mp3'

export function SpringInABottle() {
    const debug = useDebug()
    const store = useCreateStore()
    const startMusic = useCrossfadeLoop({
        url: MUSIC_URL,
        volume: 0.4,
        crossfadeDuration: 4,
    })
    const startExperience = useSceneState((state) => state.start)

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

            <StartScreen
                onStart={(shouldPlayAudio) => {
                    startExperience(shouldPlayAudio)
                    if (shouldPlayAudio) startMusic()
                }}
            />

            <Loader
                containerStyles={{
                    zIndex: 2,
                }}
            />

            <Credits />
        </>
    )
}

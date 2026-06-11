import { LevaPanel, useCreateStore } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

import { Experience } from './Experience'
import { CAMERA_POSITION } from './utils/camera'
import { useDebug } from './hooks/useDebug'

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
        </>
    )
}

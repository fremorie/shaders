import { LevaPanel, useCreateStore } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { Experience } from './Experience'

export function SpringInABottle() {
    const store = useCreateStore()

    return (
        <>
            <LevaPanel store={store} />

            <Canvas
                flat
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [2, 1, 2],
                }}
                gl={{ stencil: true }}
            >
                <color args={['#291b18']} attach="background" />
                <OrbitControls makeDefault />
                <Perf position="bottom-right" />
                <Experience store={store} />
            </Canvas>
        </>
    )
}

import { LevaPanel, useCreateStore } from 'leva'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { Experience } from './Experience'
import { CAMERA_POSITION } from './utils/camera'

export function SpringInABottle() {
    const store = useCreateStore()

    return (
        <>
            <LevaPanel store={store} hidden={true} />

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
                <color args={['#291b18']} attach="background" />
                <OrbitControls
                    makeDefault
                    maxDistance={10}
                    minDistance={2}
                    target={[0, 1.2, 0]}
                />
                {/*<Perf position="bottom-right" />*/}
                <Experience store={store} />
            </Canvas>
        </>
    )
}

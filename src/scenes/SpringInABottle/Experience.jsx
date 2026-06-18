import { Environment, Float } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import gsap from 'gsap'
import { folder, useControls } from 'leva'

import { Scene } from './Scene'
import { BottleModel } from './BottleModel'
import { CircularMask } from './CircularMask'
import { MagicGlass } from './MagicGlass'
import { CAMERA_POSITION } from './utils/camera'
import { useDebug } from './hooks/useDebug'
import { CorkModel } from './CorkModel'

export function Experience({ store }) {
    const debug = useDebug()

    const camera = useThree((state) => state.camera)

    const levaControls = useControls(
        {
            Camera: folder({
                x: { value: CAMERA_POSITION.initial[0], min: -20, max: 20 },
                y: { value: CAMERA_POSITION.initial[1], min: -20, max: 20 },
                z: { value: CAMERA_POSITION.initial[2], min: -20, max: 20 },
            }),
        },
        { store }
    )

    useEffect(() => {
        if (debug) {
            camera.position.set(levaControls.x, levaControls.y, levaControls.z)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [levaControls.x, levaControls.y, levaControls.z])

    useEffect(() => {
        gsap.to(camera.position, {
            x: CAMERA_POSITION.final[0],
            y: CAMERA_POSITION.final[1],
            z: CAMERA_POSITION.final[2],
            duration: 7,
            delay: 1,
            ease: 'power1.out',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Environment
                files={['./environmentMaps/veniceSunset/venice_sunset_1k.hdr']}
                background={true}
                backgroundBlurriness={0.5}
                backgroundIntensity={0.5}
            />

            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <group
                    // Rotate the whole scene so that it looks like
                    // the sun from the environment map casts shadows.
                    rotation-y={-2.8}
                >
                    <BottleModel store={store} />
                    <CorkModel />
                    <Scene store={store} />
                    <CircularMask />
                    <MagicGlass />
                </group>
            </Float>
        </>
    )
}

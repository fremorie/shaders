import { useEffect, useRef, useState } from 'react'
import { folder, useControls } from 'leva'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

export function Environment({ debug }) {
    const directionalLightRef = useRef(null)
    const [shadowCamera, setShadowCamera] = useState(null)

    const lightPosition = useControls('Directional Light', {
        lightPosition: folder({
            X: { value: 10, max: 10, min: -10, step: 0.01 },
            Y: { value: 20, max: 10, min: -10, step: 0.01 },
            Z: { value: 30, max: 10, min: -10, step: 0.01 },
        }),
    })

    useHelper(
        debug ? directionalLightRef : null,
        THREE.DirectionalLightHelper,
        1
    )

    useHelper(
        debug && shadowCamera ? { current: shadowCamera } : null,
        THREE.CameraHelper
    )

    useEffect(() => {
        if (directionalLightRef.current) {
            setShadowCamera(directionalLightRef.current.shadow.camera)
        }
    }, [])

    return (
        <>
            <directionalLight
                ref={directionalLightRef}
                castShadow
                position={[lightPosition.X, lightPosition.Y, lightPosition.Z]}
                intensity={4.5}
                shadow-normalBias={0.04}
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0005}
                shadow-camera-near={0.1}
                shadow-camera-far={25}
                shadow-camera-top={6}
                shadow-camera-bottom={-5}
                shadow-camera-left={-3}
                shadow-camera-right={3}
            />
            <ambientLight intensity={1.5} />
        </>
    )
}

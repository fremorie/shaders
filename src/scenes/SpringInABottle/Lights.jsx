import { useHelper } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

export function Lights({ debug, store }) {
    const directionalLightRef = useRef(null)
    const [shadowCamera, setShadowCamera] = useState(null)

    const lightPosition = useControls(
        'Directional Light',
        {
            lightPosition: folder({
                X: { value: 0.04, max: 10, min: -10, step: 0.01 },
                Y: { value: 3.13, max: 10, min: -10, step: 0.01 },
                Z: { value: 0.51, max: 10, min: -10, step: 0.01 },
            }),
        },
        { store }
    )

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
        <directionalLight
            ref={directionalLightRef}
            position={[lightPosition.X, lightPosition.Y, lightPosition.Z]}
            intensity={0.1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0005}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
            shadow-camera-top={3}
            shadow-camera-bottom={-3}
            shadow-camera-left={-3}
            shadow-camera-right={3}
        />
    )
}

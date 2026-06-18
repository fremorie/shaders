import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import vertexShader from './shaders/driftingPetal/vertex.glsl'
import fragmentShader from './shaders/driftingPetal/fragment.glsl'
import { SEASONS, useStencil } from './utils/stencilBuffer'
import { folder, useControls } from 'leva'
import * as THREE from 'three'

const DriftingPetalMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: null,
        uDarkColor: new THREE.Color('#c89580'),
        uLightColor: new THREE.Color('#e5d9d1'),
    },
    vertexShader,
    fragmentShader
)

extend({ DriftingPetalMaterial })

export function DriftingPetal({ store }) {
    const stencil = useStencil(SEASONS.spring)
    const petalTexture = useTexture('./textures/petal/petal.png')
    const driftingPetalMaterialRef = useRef(null)

    const { darkColor, lightColor } = useControls(
        {
            'Drifting petal': folder({
                darkColor: '#c89580',
                lightColor: '#e5d9d1',
            }),
        },
        { store }
    )

    useEffect(() => {
        driftingPetalMaterialRef.current.uDarkColor = new THREE.Color(darkColor)
        driftingPetalMaterialRef.current.uLightColor = new THREE.Color(
            lightColor
        )
    }, [lightColor, darkColor])

    return (
        <mesh
            position-y={0.51}
            position-x={-0.3}
            rotation-x={-Math.PI / 2}
            scale={0.05}
        >
            <planeGeometry />
            <driftingPetalMaterial
                key={DriftingPetalMaterial}
                ref={driftingPetalMaterialRef}
                uTexture={petalTexture}
                alphaToCoverage
                {...stencil}
            />
        </mesh>
    )
}

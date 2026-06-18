import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { folder, useControls } from 'leva'
import * as THREE from 'three'
import gsap from 'gsap'

import vertexShader from './shaders/driftingPetal/vertex.glsl'
import fragmentShader from './shaders/driftingPetal/fragment.glsl'
import { SEASONS, useStencil } from './utils/stencilBuffer'

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
    const petalMeshRef = useRef(null)
    const petalGroupRef = useRef(null)

    const { darkColor, lightColor, positionX, positionY, positionZ } =
        useControls(
            {
                'Drifting petal': folder({
                    darkColor: '#c89580',
                    lightColor: '#e5d9d1',
                    positionX: { value: 0, min: -1, max: 1, step: 0.01 },
                    positionY: { value: 0.51, min: -1, max: 1, step: 0.01 },
                    positionZ: { value: 0, min: -1, max: 1, step: 0.01 },
                }),
            },
            { store }
        )

    useEffect(() => {
        driftingPetalMaterialRef.current.uDarkColor.set(darkColor)
        driftingPetalMaterialRef.current.uLightColor.set(lightColor)
    }, [lightColor, darkColor])

    const petalTrajectory = [
        [0.2, positionY, 1.2],
        [0.14, positionY, 1],
        [0.07, positionY, 0.85],
        [0, positionY, 0.64],

        [0, positionY, 0.5],
        [-0.1, positionY, 0.32],
        [-0.2, positionY, 0.14],
        [-0.4, positionY, -0.1],

        [-0.5, positionY, -0.3],
        [-0.6, positionY, -0.6],
        [-0.6, positionY, -0.8],
        [-0.9, positionY, -0.9],
        [-1.1, positionY, -1.1],
    ]

    const petalPosition = {
        x: 0.2,
        y: 0.51,
        z: 1.3,
    }

    useEffect(() => {
        const timeline = gsap.timeline({ repeat: -1 })

        petalTrajectory.forEach(([x, y, z], index) => {
            timeline.to(petalGroupRef.current.position, {
                x,
                y,
                z,
                duration: 2,
                ease: 'none',
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <group
            ref={petalGroupRef}
            position={[petalPosition.x, petalPosition.y, petalPosition.z]}
        >
            <mesh ref={petalMeshRef} rotation-x={-Math.PI / 2} scale={0.1}>
                <planeGeometry />
                <driftingPetalMaterial
                    key={DriftingPetalMaterial}
                    ref={driftingPetalMaterialRef}
                    uTexture={petalTexture}
                    alphaToCoverage
                    {...stencil}
                />
            </mesh>
        </group>
    )
}

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
        driftingPetalMaterialRef.current.uDarkColor = new THREE.Color(darkColor)
        driftingPetalMaterialRef.current.uLightColor = new THREE.Color(
            lightColor
        )
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
        const tl = gsap.timeline({ repeat: -1 })

        tl.to(petalGroupRef.current.position, {
            x: petalTrajectory[0][0],
            y: petalTrajectory[0][1],
            z: petalTrajectory[0][2],
            duration: 2,
            delay: 1,
            ease: 'none',
        })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[1][0],
                y: petalTrajectory[1][1],
                z: petalTrajectory[1][2],
                duration: 2,
                delay: 1,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[2][0],
                y: petalTrajectory[2][1],
                z: petalTrajectory[2][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[3][0],
                y: petalTrajectory[3][1],
                z: petalTrajectory[3][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[4][0],
                y: petalTrajectory[4][1],
                z: petalTrajectory[4][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[5][0],
                y: petalTrajectory[5][1],
                z: petalTrajectory[5][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[6][0],
                y: petalTrajectory[6][1],
                z: petalTrajectory[6][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[7][0],
                y: petalTrajectory[7][1],
                z: petalTrajectory[7][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[8][0],
                y: petalTrajectory[8][1],
                z: petalTrajectory[8][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[9][0],
                y: petalTrajectory[9][1],
                z: petalTrajectory[9][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[10][0],
                y: petalTrajectory[10][1],
                z: petalTrajectory[10][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[11][0],
                y: petalTrajectory[11][1],
                z: petalTrajectory[11][2],
                duration: 2,
                ease: 'none',
            })
            .to(petalGroupRef.current.position, {
                x: petalTrajectory[12][0],
                y: petalTrajectory[12][1],
                z: petalTrajectory[12][2],
                duration: 2,
                ease: 'none',
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useFrame((state) => {
    //     const elapsedTime = state.clock.elapsedTime
    //
    //     if (petalMeshRef.current) {
    //         petalMeshRef.current.rotation.y = Math.sin(elapsedTime)
    //     }
    // })

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

import { useEffect, useMemo, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import vertexShader from './shaders/cherryBlossomPetals/vertex.glsl'
import fragmentShader from './shaders/cherryBlossomPetals/fragment.glsl'
import { SEASONS, useStencil } from './utils/stencilBuffer'
import { generateCherryBlossomPetalPositions } from './utils/generateCherryBlossomPetalPositions'

const PetalMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: null,
        uDarkColor: new THREE.Color('#E9B1CD'),
        uLightColor: new THREE.Color('#e8d4de'),
    },
    vertexShader,
    fragmentShader
)

extend({ PetalMaterial })

export function CherryBlossomPetals({ store }) {
    const stencil = useStencil(SEASONS.spring)
    const petalTexture = useTexture('./textures/petal/petal.png')

    const petalMaterialRef = useRef(null)

    useFrame((state, delta) => {
        if (petalMaterialRef.current) {
            petalMaterialRef.current.uTime += delta * 0.1
        }
    })

    const petalsCount = 30
    const { positions, seeds, sizes } = useMemo(
        () => generateCherryBlossomPetalPositions(petalsCount),
        []
    )

    const { darkColor, lightColor } = useControls(
        {
            'Cherry blossom petals': folder({
                darkColor: '#E9B1CD',
                lightColor: '#e8d4de',
            }),
        },
        { store }
    )

    useEffect(() => {
        petalMaterialRef.current.uDarkColor = new THREE.Color(darkColor)
        petalMaterialRef.current.uLightColor = new THREE.Color(lightColor)
    }, [lightColor, darkColor])

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={petalsCount}
                    itemSize={3} // x, y, z
                    array={positions}
                />
                <bufferAttribute
                    attach="attributes-aSeed"
                    count={petalsCount}
                    itemSize={1}
                    array={seeds}
                />
                <bufferAttribute
                    attach="attributes-aSize"
                    count={petalsCount}
                    itemSize={1}
                    array={sizes}
                />
            </bufferGeometry>
            <petalMaterial
                ref={petalMaterialRef}
                key={PetalMaterial.key}
                uTexture={petalTexture}
                alphaToCoverage
                {...stencil}
            />
        </points>
    )
}

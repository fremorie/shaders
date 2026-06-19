import { useGLTF, useTexture, shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

import vertexShader from './shaders/river/vertex.glsl'
import fragmentShader from './shaders/river/fragment.glsl'
import { useStencil } from './utils/stencilBuffer'
import { SEASONS } from './store/useSceneState'

const RiverMaterial = shaderMaterial(
    {
        uTime: 0,
        uEdgeColor: new THREE.Color('#dbd497'),
        uDepthColor: new THREE.Color('#23938a'),
        uDepthMap: null,
        uPerlinNoise: null,
        uFresnelColor: new THREE.Color('#ffffff'),
        uFresnelPower: 3.0,
        uFresnelStrength: 0.6,
    },
    vertexShader,
    fragmentShader
)

extend({ RiverMaterial })

export function SpringModel({ store }) {
    const stencil = useStencil(SEASONS.spring)

    const { nodes } = useGLTF('./models/Spring/Spring3.glb')
    const bakedTexture = useTexture('./models/Spring/baked.jpg')
    const depthMap = useTexture(
        './models/Spring/SpringTerrainDepthMapFixed2.jpg'
    )
    const perlinNoise = useTexture('./textures/perlinNoise/perlin.png')

    // eslint-disable-next-line
    bakedTexture.flipY = false
    // eslint-disable-next-line
    depthMap.flipY = false

    const riverMaterialRef = useRef(null)

    useFrame((state, delta) => {
        if (riverMaterialRef.current) {
            riverMaterialRef.current.uTime += delta
        }
    })

    const { fresnelColor, fresnelPower, fresnelStrength } = useControls(
        'River',
        {
            fresnelColor: '#ffffff',
            fresnelPower: { value: 4.2, min: 0.5, max: 10, step: 0.1 },
            fresnelStrength: { value: 0.88, min: 0, max: 1, step: 0.01 },
        },
        { store }
    )

    useEffect(() => {
        riverMaterialRef.current.uFresnelColor = new THREE.Color(fresnelColor)
        riverMaterialRef.current.uFresnelPower = fresnelPower
        riverMaterialRef.current.uFresnelStrength = fresnelStrength
    }, [fresnelColor, fresnelPower, fresnelStrength])

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.merged.geometry}
                position={[-0.871, 0.616, 0.325]}
            >
                <meshBasicMaterial map={bakedTexture} {...stencil} />
            </mesh>
            <mesh
                geometry={nodes.river.geometry}
                position={[-0.251, 0.508, 0.127]}
            >
                <riverMaterial
                    key={RiverMaterial.key}
                    ref={riverMaterialRef}
                    uDepthMap={depthMap}
                    uPerlinNoise={perlinNoise}
                    {...stencil}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Spring/Spring3.glb')
useTexture.preload('./models/Spring/baked.jpg')
useTexture.preload('./models/Spring/SpringTerrainDepthMapFixed2.jpg')
useTexture.preload('./textures/perlinNoise/perlin.png')

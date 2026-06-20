import { shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'

import { useStencil } from './utils/stencilBuffer'
import { SEASONS } from './store/useSceneState'
import vertexShader from './shaders/snow/vertex.glsl'
import fragmentShader from './shaders/snow/fragment.glsl'
import riverVertexShader from './shaders/winterRiver/vertex.glsl'
import riverFragmentShader from './shaders/winterRiver/fragment.glsl'

const SnowMaterial = shaderMaterial(
    {
        uTime: 0,
        uBakedTexture: null,
        uPerlinNoise: null,
    },
    vertexShader,
    fragmentShader
)

extend({ SnowMaterial })

const WinterRiverMaterial = shaderMaterial(
    {
        uTime: 0,
        uEdgeColor: new THREE.Color('#66e8ff'),
        uDepthColor: new THREE.Color('#236194'),
        uDepthMap: null,
        uPerlinNoise: null,
        uFresnelColor: new THREE.Color('#ffffff'),
        uFresnelPower: 4.2,
        uFresnelStrength: 0.88,
    },
    riverVertexShader,
    riverFragmentShader
)

extend({ WinterRiverMaterial })

export function WinterModel({ store }) {
    const stencil = useStencil(SEASONS.winter)

    const winterRiverMaterialRef = useRef(null)

    const { nodes } = useGLTF('./models/Winter/WinterMerged2.glb')
    const bakedTexture = useTexture('./models/Winter/BakedWinter.jpg')
    const depthMap = useTexture(
        './models/Spring/SpringTerrainDepthMapFixed2.jpg'
    )
    // eslint-disable-next-line
    bakedTexture.flipY = false
    // eslint-disable-next-line
    depthMap.flipY = false

    const perlinNoise = useTexture('./textures/perlinNoise/perlin.png')

    const { edgeColor, depthColor } = useControls(
        'Winter River',
        {
            edgeColor: '#66e8ff',
            depthColor: '#236194',
        },
        { store }
    )

    useEffect(() => {
        winterRiverMaterialRef.current.uEdgeColor = new THREE.Color(edgeColor)
        winterRiverMaterialRef.current.uDepthColor = new THREE.Color(depthColor)
    }, [edgeColor, depthColor])

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.river002.geometry}
                position={[-0.251, 0.508, 0.127]}
            >
                <winterRiverMaterial
                    ref={winterRiverMaterialRef}
                    key={WinterRiverMaterial.key}
                    uDepthMap={depthMap}
                    {...stencil}
                />
            </mesh>
            <mesh
                geometry={nodes.snow001.geometry}
                position={[0.859, 0.707, -0.054]}
            >
                <snowMaterial
                    key={SnowMaterial.key}
                    uBakedTexture={bakedTexture}
                    uPerlinNoise={perlinNoise}
                    {...stencil}
                />
            </mesh>
            <mesh
                geometry={nodes.winterMerged.geometry}
                position={[0.316, 0.539, 0.82]}
            >
                <meshBasicMaterial map={bakedTexture} {...stencil} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Winter/WinterMerged2.glb')
useTexture.preload('./models/Winter/BakedWinter.jpg')
useTexture.preload('./textures/perlinNoise/perlin.png')
useTexture.preload('./models/Spring/SpringTerrainDepthMapFixed2.jpg')

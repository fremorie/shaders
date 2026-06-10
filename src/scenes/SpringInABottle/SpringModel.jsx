import { useGLTF, useTexture, shaderMaterial, useMask } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import vertexShader from './shaders/river/vertex.glsl'
import fragmentShader from './shaders/river/fragment.glsl'

const RiverMaterial = shaderMaterial(
    {
        uTime: 0,
        uEdgeColor: new THREE.Color('#dbd497'),
        uDepthColor: new THREE.Color('#23938a'),
        uDepthMap: null,
        uPerlinNoise: null,
    },
    vertexShader,
    fragmentShader
)

extend({ RiverMaterial })

export function SpringModel() {
    const stencil = useMask(1, true)

    const { nodes } = useGLTF('./models/Spring/Spring3.glb')
    const bakedTexture = useTexture('./models/Spring/baked.jpg')
    const depthMap = useTexture(
        './models/Spring/SpringTerrainDepthMapFixed.jpg'
    )
    const perlinNoise = useTexture('./textures/perlin.png')

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

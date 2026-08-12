import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { oakFoliageMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Tree({ store }) {
    const foliageTexture = useTexture('./textures/foliage/oak_v2.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')
    const normalMap = useTexture('./textures/wood/bark_willow_02_nor_gl_1k.jpg')

    const { nodes } = useGLTF('./models/LeafyTree.glb')

    // eslint-disable-next-line
    useEffect(() => {
        oakFoliageMaterial.alphaMap = foliageTexture

        // eslint-disable-next-line
        perlinNoiseTexture.wrapS = THREE.RepeatWrapping
        perlinNoiseTexture.wrapT = THREE.RepeatWrapping
        perlinNoiseTexture.needsUpdate = true

        oakFoliageMaterial.uniforms.uPerlinNoiseTexture.value =
            perlinNoiseTexture
        oakFoliageMaterial.needsUpdate = true
        bushDepthMaterial.needsUpdate = true
    }, [foliageTexture, perlinNoiseTexture])

    useFrame((_, delta) => {
        oakFoliageMaterial.uniforms.uTime.value += delta
    })

    const { uWorldNoiseScale, uSpeed } = useControls(
        {
            Bush: folder({
                uWorldNoiseScale: {
                    value: oakFoliageMaterial.uniforms.uWorldNoiseScale.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
                uSpeed: {
                    value: oakFoliageMaterial.uniforms.uSpeed.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
        },
        { store }
    )

    useEffect(() => {
        oakFoliageMaterial.uniforms.uSpeed.value = uSpeed
        oakFoliageMaterial.uniforms.uWorldNoiseScale.value = uWorldNoiseScale
    }, [uSpeed, uWorldNoiseScale])

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.Leaves.geometry}
                material={oakFoliageMaterial}
                customDepthMaterial={bushDepthMaterial}
                position={[-0.117, 2.789, 1.129]}
                rotation={[0, -1.454, 0]}
                scale={0.462}
            />
            <mesh castShadow receiveShadow geometry={nodes.Tree.geometry}>
                <meshStandardMaterial
                    color="#4e433f"
                    roughness={1}
                    metalness={0}
                    normalMap={normalMap}
                />
            </mesh>
        </group>
    )
}

useTexture.preload('./textures/foliage/foliage.png')

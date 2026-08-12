import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { mapleFoliageMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Maple({ store }) {
    const foliageTexture = useTexture('./textures/foliage/maple.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')
    const normalMap = useTexture('./textures/wood/bark_willow_02_nor_gl_1k.jpg')

    const { nodes } = useGLTF('./models/LeafyTree.glb')

    // eslint-disable-next-line
    useEffect(() => {
        mapleFoliageMaterial.alphaMap = foliageTexture

        // eslint-disable-next-line
        perlinNoiseTexture.wrapS = THREE.RepeatWrapping
        perlinNoiseTexture.wrapT = THREE.RepeatWrapping
        perlinNoiseTexture.needsUpdate = true

        mapleFoliageMaterial.uniforms.uPerlinNoiseTexture.value =
            perlinNoiseTexture
        mapleFoliageMaterial.needsUpdate = true
        bushDepthMaterial.needsUpdate = true
    }, [foliageTexture, perlinNoiseTexture])

    useFrame((_, delta) => {
        mapleFoliageMaterial.uniforms.uTime.value += delta
    })

    const { uWorldNoiseScale, uSpeed } = useControls(
        {
            Bush: folder({
                uWorldNoiseScale: {
                    value: mapleFoliageMaterial.uniforms.uWorldNoiseScale.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
                uSpeed: {
                    value: mapleFoliageMaterial.uniforms.uSpeed.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
        },
        { store }
    )

    useEffect(() => {
        mapleFoliageMaterial.uniforms.uSpeed.value = uSpeed
        mapleFoliageMaterial.uniforms.uWorldNoiseScale.value = uWorldNoiseScale
    }, [uSpeed, uWorldNoiseScale])

    return (
        <group position={[-5, 0, 5]}>
            <mesh
                castShadow
                geometry={nodes.Leaves.geometry}
                material={mapleFoliageMaterial}
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

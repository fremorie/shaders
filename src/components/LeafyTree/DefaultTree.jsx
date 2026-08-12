import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { bushMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function DefaultTree({ store }) {
    const foliageTexture = useTexture('./textures/foliage/foliage.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')
    const normalMap = useTexture('./textures/wood/bark_willow_02_nor_gl_1k.jpg')

    const { nodes } = useGLTF('./models/LeafyTree.glb')

    // eslint-disable-next-line
    useEffect(() => {
        bushMaterial.alphaMap = foliageTexture

        // eslint-disable-next-line
        perlinNoiseTexture.wrapS = THREE.RepeatWrapping
        perlinNoiseTexture.wrapT = THREE.RepeatWrapping
        perlinNoiseTexture.needsUpdate = true

        bushMaterial.uniforms.uPerlinNoiseTexture.value = perlinNoiseTexture
        bushMaterial.needsUpdate = true
        bushDepthMaterial.needsUpdate = true
    }, [foliageTexture, perlinNoiseTexture])

    useFrame((_, delta) => {
        bushMaterial.uniforms.uTime.value += delta
    })

    const { uWorldNoiseScale, uSpeed } = useControls(
        {
            Bush: folder({
                uWorldNoiseScale: {
                    value: bushMaterial.uniforms.uWorldNoiseScale.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
                uSpeed: {
                    value: bushMaterial.uniforms.uSpeed.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
        },
        { store }
    )

    useEffect(() => {
        bushMaterial.uniforms.uSpeed.value = uSpeed
        bushMaterial.uniforms.uWorldNoiseScale.value = uWorldNoiseScale
    }, [uSpeed, uWorldNoiseScale])

    return (
        <group position={[-10, 0, 8]}>
            <mesh
                castShadow
                geometry={nodes.Leaves.geometry}
                material={bushMaterial}
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

import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { oakFoliageMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Oak({ store }) {
    const foliageTexture = useTexture('./textures/foliage/oak_v2.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')

    const { nodes, materials } = useGLTF('./models/OakFlat.glb')

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
        <group position={[7, 0, 0]} scale={1.4}>
            <mesh
                castShadow
                geometry={nodes.oakFoliage.geometry}
                material={oakFoliageMaterial}
                customDepthMaterial={bushDepthMaterial}
                position={[0.532, 2.829, -0.267]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.oak.geometry}
                material={materials.Tree_Wood}
            />
        </group>
    )
}

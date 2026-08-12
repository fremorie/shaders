import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { bushDepthMaterial, birchFoliageMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Birch({ store }) {
    const foliageTexture = useTexture('./textures/foliage/birch_v2.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')

    // eslint-disable-next-line
    foliageTexture.wrapS = THREE.RepeatWrapping
    // eslint-disable-next-line
    foliageTexture.wrapT = THREE.RepeatWrapping

    const { nodes, materials } = useGLTF('./models/BirchFlat.glb')

    // eslint-disable-next-line
    useEffect(() => {
        birchFoliageMaterial.alphaMap = foliageTexture

        // eslint-disable-next-line
        perlinNoiseTexture.wrapS = THREE.RepeatWrapping
        perlinNoiseTexture.wrapT = THREE.RepeatWrapping
        perlinNoiseTexture.needsUpdate = true

        birchFoliageMaterial.uniforms.uPerlinNoiseTexture.value =
            perlinNoiseTexture
        birchFoliageMaterial.needsUpdate = true
        bushDepthMaterial.needsUpdate = true
    }, [foliageTexture, perlinNoiseTexture])

    useFrame((_, delta) => {
        birchFoliageMaterial.uniforms.uTime.value += delta
    })

    const { uWorldNoiseScale, uSpeed } = useControls(
        {
            Bush: folder({
                uWorldNoiseScale: {
                    value: birchFoliageMaterial.uniforms.uWorldNoiseScale.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
                uSpeed: {
                    value: birchFoliageMaterial.uniforms.uSpeed.value,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
        },
        { store }
    )

    useEffect(() => {
        birchFoliageMaterial.uniforms.uSpeed.value = uSpeed
        birchFoliageMaterial.uniforms.uWorldNoiseScale.value = uWorldNoiseScale
    }, [uSpeed, uWorldNoiseScale])

    return (
        <group position={[0, 0, 0]} scale={1.8}>
            <mesh
                castShadow
                geometry={nodes.Foliage.geometry}
                material={birchFoliageMaterial}
                customDepthMaterial={bushDepthMaterial}
                position={[0, 3.284, 0.054]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1007.geometry}
                material={materials['White.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1007_1.geometry}
                material={materials['Black.001']}
            />
        </group>
    )
}

useTexture.preload('./textures/foliage/foliage.png')

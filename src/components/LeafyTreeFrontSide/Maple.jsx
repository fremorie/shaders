import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { mapleFoliageMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Maple({ store }) {
    const foliageTexture = useTexture('./textures/foliage/maple_v2.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')

    const { nodes, materials } = useGLTF('./models/MapleFlat.glb')

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
        <group position={[-7, 0, 0]} scale={1.5}>
            <mesh
                castShadow
                geometry={nodes.mapleFoliageV2.geometry}
                material={mapleFoliageMaterial}
                customDepthMaterial={bushDepthMaterial}
                position={[0.745, 2.35, 0.406]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.maple.geometry}
                material={materials['Tree_Wood.001']}
            />
        </group>
    )
}

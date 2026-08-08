import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { bushMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Birch({ store }) {
    const foliageTexture = useTexture('./textures/foliage/foliage.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')

    // eslint-disable-next-line
    foliageTexture.wrapS = THREE.RepeatWrapping
    // eslint-disable-next-line
    foliageTexture.wrapT = THREE.RepeatWrapping

    const { nodes, materials } = useGLTF('./models/Birch.glb')

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
        <group position={[5, 0, -5]}>
            <mesh
                castShadow
                geometry={nodes.BushB001.geometry}
                material={bushMaterial}
                customDepthMaterial={bushDepthMaterial}
                position={[0.549, 2.301, 0.347]}
            />
            <group position={[0.035, 0, 0.018]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.BirchTree_Dead_3_1.geometry}
                    material={materials.White}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.BirchTree_Dead_3_2.geometry}
                    material={materials.Black}
                />
            </group>
        </group>
    )
}

useTexture.preload('./textures/foliage/foliage.png')

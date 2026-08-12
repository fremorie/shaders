import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { bushMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Bush() {
    const foliageTexture = useTexture('./textures/foliage/birch_v2.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')

    const { nodes } = useGLTF('./models/bush.glb')

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

    const { uWorldNoiseScale, uSpeed } = useControls({
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
    })

    useEffect(() => {
        bushMaterial.uniforms.uSpeed.value = uSpeed
        bushMaterial.uniforms.uWorldNoiseScale.value = uWorldNoiseScale
    }, [uSpeed, uWorldNoiseScale])

    return (
        <>
            <group dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.BushA.geometry}
                    material={bushMaterial}
                    customDepthMaterial={bushDepthMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.BushB.geometry}
                    position={[6, 0, 0]}
                    material={bushMaterial}
                    customDepthMaterial={bushDepthMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.BushC.geometry}
                    position={[12, 0, 0]}
                    material={bushMaterial}
                    customDepthMaterial={bushDepthMaterial}
                />
            </group>
        </>
    )
}

useTexture.preload('./textures/foliage/birch_v2.png')

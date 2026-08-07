import { useEffect, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { createFoliage } from './utils/foliage'
import { bushMaterial, bushDepthMaterial } from './bushMaterial'
import { useFrame } from '@react-three/fiber'

export function Bush() {
    const foliageTexture = useTexture('./textures/foliage/foliage.png')
    const perlinNoiseTexture = useTexture('./textures/perlinNoise/perlin.png')

    const bush1Geometry = useMemo(() => createFoliage('bushA'), [])
    const bush2Geometry = useMemo(() => createFoliage('bushB'), [])
    const bush3Geometry = useMemo(() => createFoliage('bushC'), [])

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

    const {
        uWorldNoiseScale,
        uSpeed,
    } = useControls({
        Bush: folder({
            uWorldNoiseScale: { value: bushMaterial.uniforms.uWorldNoiseScale.value, min: 0, max: 1, step: 0.01 },
            uSpeed: { value: bushMaterial.uniforms.uSpeed.value, min: 0, max: 1, step: 0.01 },
        }),
    })

    useEffect(() => {
        bushMaterial.uniforms.uSpeed.value = uSpeed;
        bushMaterial.uniforms.uWorldNoiseScale.value = uWorldNoiseScale;
    }, [uSpeed, uWorldNoiseScale])

    return (
        <>
            <mesh castShadow geometry={bush1Geometry} material={bushMaterial} />
            <mesh
                castShadow
                geometry={bush2Geometry}
                material={bushMaterial}
                position-x={6}
            />
            <mesh
                castShadow
                geometry={bush3Geometry}
                material={bushMaterial}
                position-x={12}
            />
        </>
    )
}

useTexture.preload('./textures/foliage/foliage.png')

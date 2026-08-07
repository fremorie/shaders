import * as THREE from 'three'
import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'

import { createFoliage } from './utils/foliage'

export function Bush() {
    const foliageTexture = useTexture('./textures/foliage/foliage.png')

    const bushGeometry = useMemo(() => createFoliage(), [])
    const bushMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                alphaMap: foliageTexture,
                transparent: true,
                alphaTest: 0.5,
                color: '#7aa823',
            }),
        [foliageTexture]
    )

    return (
        <>
            <mesh castShadow geometry={bushGeometry} material={bushMaterial} />
        </>
    )
}

useTexture.preload('./textures/foliage/foliage.png')

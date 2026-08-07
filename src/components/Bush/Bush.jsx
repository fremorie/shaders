import * as THREE from 'three'
import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'

import { createFoliage } from './utils/foliage'

export function Bush() {
    const foliageTexture = useTexture('./textures/foliage/foliage.png')

    const bush1Geometry = useMemo(() => createFoliage('bushA'), [])
    const bush2Geometry = useMemo(() => createFoliage('bushB'), [])
    const bush3Geometry = useMemo(() => createFoliage('bushC'), [])

    const bushMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                alphaMap: foliageTexture,
                transparent: true,
                alphaTest: 0.7,
                color: '#7aa823',
            }),
        [foliageTexture]
    )

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

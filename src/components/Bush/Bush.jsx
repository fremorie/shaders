import * as THREE from 'three'
import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'

import { createFoliage } from './utils/foliage'

const bushMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })

export function Bush() {
    // const foliageTexture = useTexture('./textures/foliage/foliage.png')

    const bushGeometry = useMemo(() => createFoliage(), [])

    return (
        <>
            <mesh
                castShadow
                receiveShadow
                geometry={bushGeometry}
                material={bushMaterial}
            />
        </>
    )
}

useTexture.preload('./textures/foliage/foliage.png')

import { useMemo } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

import { ButterflyModel } from './ButterflyModel'

export function Butterflies({ store }) {
    const { color, metalness, roughness } = useControls(
        'Butterfly',
        {
            color: '#9bb7f5',
            metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
            roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        },
        { store }
    )

    const wingMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color,
                metalness,
                roughness,
            }),
        [color, metalness, roughness]
    )

    return (
        <>
            <ButterflyModel position={[0.7, 1, 0]} material={wingMaterial} />
            <ButterflyModel
                position={[-0.2, 1.3, -0.4]}
                rotation={[0, Math.PI, 0]}
                material={wingMaterial}
            />
        </>
    )
}

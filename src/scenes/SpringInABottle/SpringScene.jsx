import { SpringModel } from './SpringModel'
import { GrassBlade } from './GrassBlade'
import { useMemo } from 'react'

const getRandom = (min, max) => Math.random() * (max - min) + min

const getGrassBladesPositions = (count = 50) => {
    const maxX = 0.4
    const maxZ = 0.04
    const minX = 0
    const minZ = -0.7
    const y = 0.67

    const positions = []

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            positions.push([getRandom(minX, maxX), y, getRandom(minZ, maxZ)])
        }
    }

    return positions
}

export function SpringScene() {
    const grassBladePositions = useMemo(() => getGrassBladesPositions(20), [])

    return (
        <>
            <SpringModel />
            {grassBladePositions.map((position) => (
                <GrassBlade
                    key={position.toString()}
                    position={position}
                    //rotationY={Math.random() * Math.PI}
                    rotationY={Math.PI / 2 + Math.random()}
                />
            ))}
            <GrassBlade position={[-0.0, 0.67, -0.7]} />
        </>
    )
}

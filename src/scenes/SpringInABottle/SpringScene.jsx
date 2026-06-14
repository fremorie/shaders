import { SpringModel } from './SpringModel'
import { GrassField } from './GrassField'
import { useMemo } from 'react'

const getRandom = (min, max) => Math.random() * (max - min) + min

const getGrassBladesPositions = (count = 20) => {
    const minX = -1
    const maxX = 1

    const minZ = -1
    const maxZ = 1

    const y = 0.6

    const positions = []

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            positions.push([getRandom(minX, maxX), y, getRandom(minZ, maxZ)])
        }
    }

    return positions
}

export function SpringScene() {
    const grassBladePositions = useMemo(() => getGrassBladesPositions(100), [])

    return (
        <>
            <SpringModel />
            <GrassField positions={grassBladePositions} />
        </>
    )
}

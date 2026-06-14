import { SpringModel } from './SpringModel'
import { GrassField } from './GrassField'
import { useMemo } from 'react'
import { useControls, folder } from 'leva'

const getRandom = (min, max) => Math.random() * (max - min) + min

const getGrassBladesPositions = (
    count = 20,

    minX = 0.91,
    maxX = 0.1,

    minZ = 0.2,
    maxZ = 0.3,
    ) => {
    const y = 0.67

    const positions = []

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            positions.push([getRandom(minX, maxX), y, getRandom(minZ, maxZ)])
        }
    }

    return positions
}

export function SpringScene({store}) {
    const {minX, maxX, minZ, maxZ} = useControls(
        {
            Grass: folder({
                minX: {value: 0.2, min: -1, max: 1, step: 0.01},
                maxX: {value: 0.3, min: -1, max: 1, step: 0.01},
                minZ: {value: 0.2, min: -1, max: 1, step: 0.01},
                maxZ: {value: 0.3, min: -1, max: 1, step: 0.01},
            }),
        },
        {store},
    );


    const grassBladePositions = useMemo(
        () => getGrassBladesPositions(
            10,
            minX,
            maxX,
            minZ,
            maxZ,
        ), [minX, maxX, minZ, maxZ]
    )

    return (
        <>
            <SpringModel />
            <GrassField positions={grassBladePositions} />
        </>
    )
}

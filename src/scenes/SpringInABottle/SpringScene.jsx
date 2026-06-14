import { SpringModel } from './SpringModel'
import { GrassField } from './GrassField'
import { useMemo } from 'react'
import { useControls, folder } from 'leva'

const getGrassBladesPositions = (center, radius, count) => {
    const positions = []
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.sqrt(Math.random()) * radius
        const x = center[0] + Math.cos(angle) * distance
        const z = center[2] + Math.sin(angle) * distance
        positions.push([x, center[1], z])
    }
    return positions
}

export function SpringScene({ store }) {
    const { centerX, centerZ, radius, count, elevation } = useControls(
        {
            Grass: folder({
                centerX: { value: 0.25, min: -1, max: 1, step: 0.01 },
                centerZ: { value: 0.25, min: -1, max: 1, step: 0.01 },
                elevation: { value: 0.67, min: 0.5, max: 1, step: 0.01 },
                radius: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
                count: { value: 100, min: 1, max: 1000, step: 1 },
            }),
        },
        { store }
    )

    const grassClamp1 = getGrassBladesPositions([0.17, 0.65, -0.3], 0.1, 100)

    const grassClamp2 = getGrassBladesPositions([0.2, 0.63, -0.4], 0.06, 58)

    const grassClamp3 = useMemo(
        () =>
            getGrassBladesPositions(
                [centerX, elevation, centerZ],
                radius,
                count
            ),
        [centerX, centerZ, radius, count, elevation]
    )

    const grassBladePositions = useMemo(
        () => [...grassClamp1, ...grassClamp2, ...grassClamp3],
        [grassClamp1, grassClamp2, grassClamp3]
    )

    console.log({ grassClamp2 })

    return (
        <>
            <SpringModel />
            <GrassField positions={grassBladePositions} />
        </>
    )
}

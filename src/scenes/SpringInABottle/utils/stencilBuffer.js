import { useMask } from '@react-three/drei'
import { useMemo, useState } from 'react'

export const MASK_ID = 1

export const SEASONS = {
    winter: 'winter',
    spring: 'spring',
}

export function useSeason() {
    const [mainSeason, setMainSeason] = useState(SEASONS.spring)

    return {
        setMainSeason,
        mainSeason,
    }
}

export function useStencil(season) {
    const { mainSeason } = useSeason()

    const inverse = season === mainSeason
    const stencil = useMask(MASK_ID, inverse)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => stencil, [inverse])
}

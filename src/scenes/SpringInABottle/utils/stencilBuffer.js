import { useMask } from '@react-three/drei'
import { useState } from 'react'

export const MASK_ID = 1

export const SEASONS = {
    winter: 'winter',
    spring: 'spring',
}

export function useSeason() {
    const [mainSeason, setMainSeason] = useState(SEASONS.winter)

    return {
        setMainSeason,
        mainSeason,
    }
}

export function useStencil(season) {
    const { mainSeason } = useSeason()

    const inverse = season === mainSeason
    const stencil = useMask(MASK_ID, inverse)

    return stencil
}

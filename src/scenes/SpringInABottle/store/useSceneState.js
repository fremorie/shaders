import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const SEASONS = {
    winter: 'winter',
    spring: 'spring',
}

export default create(
    subscribeWithSelector((set) => {
        return {
            isBottleOpen: false,
            activeSeason: SEASONS.spring,
            phase: 'init',

            /**
             * Phases
             */
            openBottle: () => {
                set(() => {
                    return {
                        isBottleOpen: true,
                        phase: 'openTransitionStart',
                    }
                })
            },

            endOpenTransition: () => {
                set(() => {
                    return {
                        isBottleOpen: true,
                        phase: 'openTransitionEnd',
                        activeSeason: SEASONS.winter,
                    }
                })
            },

            closeBottle: () => {
                set(() => {
                    return {
                        isBottleOpen: false,
                        phase: 'closeTransitionStart',
                    }
                })
            },

            endCloseTransition: () => {
                set(() => {
                    return {
                        phase: 'closeTransitionEnd',
                        activeSeason: SEASONS.spring,
                    }
                })
            },
        }
    })
)

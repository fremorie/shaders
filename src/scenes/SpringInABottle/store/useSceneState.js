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
                        phase: 'transitionStart',
                    }
                })
            },

            endTransition: () => {
                set(() => {
                    return {
                        phase: 'transitionEnd',
                        activeSeason: SEASONS.winter,
                    }
                })
            },
        }
    })
)

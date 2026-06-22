import { useEffect } from 'react'
import gsap from 'gsap'

import useSceneState from '../store/useSceneState'
import { TRANSITION_HALF_DURATION } from '../utils/transition'

export function useBottleAnimation(bottleRef) {
    const phase = useSceneState((state) => state.phase)
    const endOpenTransitionAction = useSceneState(
        (state) => state.endOpenTransition
    )
    const endCloseTransitionAction = useSceneState(
        (state) => state.endCloseTransition
    )

    useEffect(() => {
        if (!bottleRef.current) return

        if (
            phase === 'openTransitionStart' ||
            phase === 'closeTransitionStart'
        ) {
            const onComplete =
                phase === 'openTransitionStart'
                    ? endOpenTransitionAction
                    : endCloseTransitionAction

            gsap.killTweensOf(bottleRef.current.material)

            const timeline = gsap.timeline()

            timeline.to(bottleRef.current.material, {
                _transmission: 0,
                duration: TRANSITION_HALF_DURATION,
                onComplete,
            })

            timeline.to(bottleRef.current.material, {
                _transmission: 0.88,
                duration: TRANSITION_HALF_DURATION,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase])
}

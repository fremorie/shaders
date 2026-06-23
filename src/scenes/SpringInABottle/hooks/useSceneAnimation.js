import { useEffect } from 'react'
import gsap from 'gsap'
import { TRANSITION_HALF_DURATION } from '../utils/transition'
import useSceneState from '../store/useSceneState'

export function useSceneAnimation(sceneRef) {
    const phase = useSceneState((state) => state.phase)

    useEffect(() => {
        if (
            phase === 'openTransitionStart' ||
            phase === 'closeTransitionStart'
        ) {
            gsap.killTweensOf(sceneRef.current.rotation)

            const timeline = gsap.timeline()

            timeline.to(sceneRef.current.rotation, {
                y: `-=${2 * Math.PI}`,
                duration: TRANSITION_HALF_DURATION * 3,
                ease: 'power1.out',
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase])
}

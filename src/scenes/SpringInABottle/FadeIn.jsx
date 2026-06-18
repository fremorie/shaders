import { useProgress } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function FadeIn() {
    const overlayElement = useRef(null)
    const { progress } = useProgress()

    useEffect(() => {
        if (progress < 100) return

        gsap.to(overlayElement.current, {
            opacity: 0,
            duration: 3,
            ease: 'sine.out',
            onComplete: () => {
                overlayElement.current.style.display = 'none'
            },
        })
    }, [progress])

    return (
        <div
            ref={overlayElement}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'black',
                opacity: 1,
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    )
}

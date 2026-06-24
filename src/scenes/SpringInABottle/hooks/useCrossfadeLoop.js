import { useEffect } from 'react'

import { createCrossfadeLoop } from '../utils/crossfadeLoop'

export function useCrossfadeLoop({ url, volume, crossfadeDuration }) {
    useEffect(() => {
        const loop = createCrossfadeLoop({ url, volume, crossfadeDuration })

        const start = () => {
            loop.start()
            removeListeners()
        }

        const removeListeners = () => {
            window.removeEventListener('pointerdown', start)
            window.removeEventListener('keydown', start)
        }

        window.addEventListener('pointerdown', start)
        window.addEventListener('keydown', start)

        return () => {
            removeListeners()
            loop.dispose()
        }
    }, [url, volume, crossfadeDuration])
}

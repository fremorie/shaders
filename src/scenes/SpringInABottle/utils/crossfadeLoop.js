export function equalPowerFade(position, duration, fadeDuration) {
    if (!Number.isFinite(duration) || duration <= 0) return 0

    const fadeInProgress = Math.min(position / fadeDuration, 1)
    const fadeOutProgress = Math.min((duration - position) / fadeDuration, 1)
    const progress = Math.max(0, Math.min(fadeInProgress, fadeOutProgress))

    return Math.sin((progress * Math.PI) / 2)
}

export function createCrossfadeLoop({ url, volume, crossfadeDuration }) {
    const voices = [new Audio(url), new Audio(url)]
    voices.forEach((voice) => {
        voice.loop = false
        voice.volume = 0
    })

    let animationFrame = null

    const startVoice = (voice) => {
        voice.currentTime = 0
        voice.volume = 0
        voice.play().catch(() => {})
    }

    const update = () => {
        voices.forEach((voice, index) => {
            if (voice.paused) return

            const { currentTime, duration } = voice
            voice.volume =
                equalPowerFade(currentTime, duration, crossfadeDuration) *
                volume

            // Once this voice enters its tail, bring in the other voice from the
            // start so their fades overlap into a crossfade.
            const otherVoice = voices[1 - index]
            if (
                duration - currentTime <= crossfadeDuration &&
                otherVoice.paused
            ) {
                startVoice(otherVoice)
            }
        })

        animationFrame = requestAnimationFrame(update)
    }

    return {
        start() {
            startVoice(voices[0])
            animationFrame = requestAnimationFrame(update)
        },
        dispose() {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame)
            }
            voices.forEach((voice) => {
                voice.pause()
                voice.src = ''
            })
        },
    }
}

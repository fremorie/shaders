import { useCrossfadeLoop } from './hooks/useCrossfadeLoop'

const MUSIC_URL = './sounds/ambientMusic/ambientMusic.mp3'

export function AmbientMusic({ volume = 0.4, crossfadeDuration = 4 }) {
    useCrossfadeLoop({ url: MUSIC_URL, volume, crossfadeDuration })

    return null
}

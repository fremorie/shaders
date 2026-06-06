import { Sparkles } from '@react-three/drei'

import { SpringModel } from './SpringModel'
import { WinterModel } from './WinterModel'

export function SpringScene() {
    return (
        <>
            <WinterModel />
            <SpringModel />
            <Sparkles
                size={2}
                scale={[1.5, 1, 1.5]}
                position-y={0.7}
                speed={0.2}
                count={40}
            />
        </>
    )
}

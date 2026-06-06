import { Sparkles } from '@react-three/drei'

import { SpringModel } from './SpringModel'

export function SpringScene() {
    return (
        <>
            <SpringModel />
            <Sparkles
                size={2}
                scale={[2, 1, 2]}
                position-y={0.7}
                speed={0.2}
                count={40}
            />
        </>
    )
}

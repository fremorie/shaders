import { Environment } from '@react-three/drei'

import { SpringScene } from './SpringScene'
import { BottleModel } from './BottleModel'
import { CircularMask } from './CircularMask'

export function Experience() {
    return (
        <>
            <Environment preset="forest" />
            <BottleModel position={[0, -0.5, 0]} />
            <SpringScene />

            <CircularMask
                position={[0.15, 0.5, 0.15]}
                rotation-y={Math.PI / 4}
            />
        </>
    )
}

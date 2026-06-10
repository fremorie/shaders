import { Environment } from '@react-three/drei'

import { Scene } from './Scene'
import { BottleModel } from './BottleModel'
import { CircularMask } from './CircularMask'

export function Experience({ store }) {
    return (
        <>
            <Environment
                preset="sunset"
                background={true}
                backgroundBlurriness={0.5}
                backgroundIntensity={0.5}
            />
            <BottleModel position={[0, -0.5, 0]} store={store} />
            <Scene />

            <CircularMask
                position={[0.15, 0.5, 0.15]}
                rotation-y={Math.PI / 4}
            />
        </>
    )
}

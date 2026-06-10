import { Environment, Float } from '@react-three/drei'

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

            <Float>
                <group>
                    <BottleModel store={store} />
                    <Scene />
                    <CircularMask />
                </group>
            </Float>
        </>
    )
}

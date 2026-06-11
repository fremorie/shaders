import { Environment, Float } from '@react-three/drei'

import { Scene } from './Scene'
import { BottleModel } from './BottleModel'
import { CircularMask } from './CircularMask'
import { MagicGlass } from './MagicGlass'

export function Experience({ store }) {
    return (
        <>
            <Environment
                preset="sunset"
                background={true}
                backgroundBlurriness={0.5}
                backgroundIntensity={0.5}
            />

            <Float speed={0.5}>
                {/* Rotate the whole scene so that it looks like
                the sun from the environment map casts shadows */}
                <group rotation-y={-2.8}>
                    <BottleModel store={store} />
                    <Scene />
                    <CircularMask />
                    <MagicGlass />
                </group>
            </Float>
        </>
    )
}

import { Environment, Float } from '@react-three/drei'

import { Scene } from './Scene'
import { BottleModel } from './BottleModel'
import { CircularMask } from './CircularMask'
import { MagicGlass } from './MagicGlass'

export function Experience({ store }) {
    return (
        <>
            <Environment
                files={['./environmentMaps/veniceSunset/venice_sunset_1k.hdr']}
                background={true}
                backgroundBlurriness={0.5}
                backgroundIntensity={0.5}
            />

            <Float speed={0.5}>
                <group
                    // Rotate the whole scene so that it looks like
                    // the sun from the environment map casts shadows.
                    rotation-y={-2.8}
                    position-y={-1}
                >
                    <BottleModel store={store} />
                    <Scene />
                    <CircularMask />
                    <MagicGlass />
                </group>
            </Float>
        </>
    )
}

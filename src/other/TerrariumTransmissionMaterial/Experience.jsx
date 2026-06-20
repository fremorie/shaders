import { Environment, Float, useEnvironment } from '@react-three/drei'

import { BottleModel } from './BottleModel'
import { Box } from './Box'
import { CircularMask } from './CircularMask'
import { Sphere } from './Sphere'

const ENVIRONMENT_FILES = [
    './environmentMaps/veniceSunset/venice_sunset_1k.hdr',
]

useEnvironment.preload({ files: ENVIRONMENT_FILES })

export function Experience() {
    return (
        <>
            <Environment
                files={ENVIRONMENT_FILES}
                background={true}
                backgroundBlurriness={0.5}
                backgroundIntensity={0.5}
            />
            <Float>
                <group
                    // Rotate the whole scene so that it looks like
                    // the sun from the environment map casts shadows.
                    rotation-y={-2.8}
                >
                    <CircularMask />
                    <BottleModel />
                    <Box />
                    <Sphere />
                </group>
            </Float>
        </>
    )
}

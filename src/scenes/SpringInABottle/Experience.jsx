import { Environment } from '@react-three/drei'

import { SpringScene } from './SpringScene'
import { BottleModel } from './BottleModel'

export function Experience() {
    return (
        <>
            <Environment background preset="forest" />
            <mesh rotation-x={-Math.PI / 2} scale={5} position-y={-0.5}>
                <planeGeometry />
                <meshBasicMaterial />
            </mesh>
            <BottleModel position={[0, -0.5, 0]} />
            <SpringScene />
        </>
    )
}

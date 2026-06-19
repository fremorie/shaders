import { CorkModel } from './CorkModel'
import { useCursor } from '@react-three/drei'
import { useRef, useState } from 'react'
import { RigidBody } from '@react-three/rapier'

import useSceneState from './store/useSceneState'

export function Cork() {
    const corkRef = useRef(null)

    const openBottleAction = useSceneState((state) => state.openBottle)

    const [hovered, setHovered] = useState(false)
    useCursor(hovered, 'pointer')

    const throwAwayCork = () => {
        const mass = corkRef.current.mass()

        corkRef.current.applyImpulse({ x: -0.1, y: 0.3 * mass, z: 0.3 }, true)
        corkRef.current.applyTorqueImpulse({ x: 0, y: 0.1, z: 0 }, true)
    }

    const handleClick = () => {
        throwAwayCork()
        openBottleAction()
    }

    return (
        <RigidBody
            colliders="hull"
            restitution={0.2}
            friction={0}
            position={[0.023, 0, -0.011]}
            ref={corkRef}
            gravityScale={0.3}
        >
            <CorkModel
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            />
        </RigidBody>
    )
}

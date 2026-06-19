import { RigidBody } from '@react-three/rapier'
import { BottleModel } from './BottleModel'

export function Bottle({ store }) {
    return (
        <RigidBody
            type="fixed"
            colliders="trimesh"
            restitution={0.2}
            friction={0}
            position={[0.023, 0, -0.011]}
        >
            <BottleModel store={store} />
        </RigidBody>
    )
}

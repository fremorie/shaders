import { useMask } from '@react-three/drei'

import { MASK_ID } from './stencilBuffer'

export function Sphere() {
    const stencil = useMask(MASK_ID)

    return (
        <mesh scale={0.5} position={[0, 1.5, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="yellow" {...stencil} />
        </mesh>
    )
}

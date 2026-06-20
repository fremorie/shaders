import { useMask } from '@react-three/drei'

import { MASK_ID } from './stencilBuffer'

export function Box() {
    const stencil = useMask(MASK_ID, true)

    return (
        <mesh scale={1} position={[0, 1, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" {...stencil} />
        </mesh>
    )
}

import { CorkModel } from './CorkModel'
import { useCursor } from '@react-three/drei'
import { useRef, useState } from 'react'

import { useCorkAnimation, PLUGGED_POSITION } from './hooks/useCorkAnimation'

export function Cork() {
    const corkGroupRef = useRef(null)

    const [hovered, setHovered] = useState(false)
    useCursor(hovered, 'pointer')

    const { handleCorkClick } = useCorkAnimation(corkGroupRef)

    return (
        <group
            ref={corkGroupRef}
            position={[
                PLUGGED_POSITION.x,
                PLUGGED_POSITION.y,
                PLUGGED_POSITION.z,
            ]}
        >
            <CorkModel
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleCorkClick}
            />
        </group>
    )
}

import { CorkModel } from './CorkModel'
import { useCursor } from '@react-three/drei'
import { useRef, useState } from 'react'

import { useCorkAnimation, PLUGGED_POSITION } from './hooks/useCorkAnimation'
import useSceneState from './store/useSceneState'

export function Cork() {
    const corkGroupRef = useRef(null)
    const isInteractive = useSceneState(
        (state) => state.hasStarted && !state.isEntranceAnimating
    )
    const setCorkHovered = useSceneState((state) => state.setCorkHovered)

    const [hovered, setHovered] = useState(false)
    useCursor(hovered, 'pointer', isInteractive ? 'grab' : 'auto')

    const handleHover = (isHovered) => {
        setHovered(isHovered)
        setCorkHovered(isHovered)
    }

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
                onPointerOver={() => handleHover(true)}
                onPointerOut={() => handleHover(false)}
                hovered={hovered}
                onClick={handleCorkClick}
            />
        </group>
    )
}

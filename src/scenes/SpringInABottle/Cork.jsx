import { CorkModel } from './CorkModel'
import { useCursor } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { RigidBody } from '@react-three/rapier'
import gsap from 'gsap'

export function Cork() {
    const corkRef = useRef(null)

    const [hovered, setHovered] = useState(false)
    useCursor(hovered, 'pointer')

    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(true)
    }

    useEffect(() => {
        if (clicked && corkRef.current) {
        }
    })

    return (
        <RigidBody
            type="fixed"
            colliders="hull"
            restitution={0.2}
            friction={0}
            position={[0.023, 0, -0.011]}
        >
            <CorkModel
                ref={corkRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            />
        </RigidBody>
    )
}

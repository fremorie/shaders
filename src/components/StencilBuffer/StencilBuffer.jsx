import {
    Float,
    Mask,
    Stage,
    useMask,
    DragControls,
    useCursor,
} from '@react-three/drei'
import { useState } from 'react'

export function StencilBuffer() {
    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1.5} />

            <Stage shadows={false}>
                <CircularMask position={[2, 0, 2]} rotation-y={Math.PI / 4} />

                <mesh scale={2} rotation-y={Math.PI / 8}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <Float floatIntensity={4} rotationIntensity={0} speed={4}>
                    <TorusKnot />
                </Float>
            </Stage>
        </>
    )
}

function TorusKnot() {
    const stencil = useMask(1)

    return (
        <mesh scale={0.4} position={[1.75, 0, 1.75]}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshPhongMaterial color="greenyellow" {...stencil} />
        </mesh>
    )
}

function Frame(props) {
    return (
        <mesh {...props}>
            <torusGeometry args={[0.5, 0.05, 32, 64]} />
            <meshPhongMaterial color="orange" />
        </mesh>
    )
}

const CircularMask = (props) => {
    const [hovered, setHovered] = useState(false)
    const [grabbed, setGrabbed] = useState(false)

    useCursor(hovered, 'grab', 'auto')
    useCursor(grabbed, 'grabbing', 'grab')

    return (
        <DragControls>
            <group
                {...props}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onPointerDown={() => setGrabbed(true)}
                onPointerUp={() => setGrabbed(false)}
            >
                <Frame position={[0, 0, 1]} />
                <Mask id={1} position={[0, 0, 0.95]}>
                    <circleGeometry args={[0.5, 64]} />
                </Mask>
            </group>
        </DragControls>
    )
}

import { Mask } from '@react-three/drei'

function Frame(props) {
    return (
        <mesh {...props}>
            <torusGeometry args={[0.5, 0.05, 32, 64]} />
            <meshPhongMaterial color="orange" />
        </mesh>
    )
}

export const CircularMask = (props) => {
    return (
        <group {...props}>
            <Frame position={[0, 0, 1]} />
            <Mask id={1} position={[0, 0, 0.95]}>
                <circleGeometry args={[0.5, 64]} />
            </Mask>
        </group>
    )
}

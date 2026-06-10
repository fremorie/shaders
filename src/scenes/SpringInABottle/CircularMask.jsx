import { Mask } from '@react-three/drei'

export const CircularMask = (props) => {
    return (
        <group {...props}>
            <Mask id={1} position={[0, 0, 0.95]}>
                <circleGeometry args={[0.5, 64]} />
            </Mask>
        </group>
    )
}

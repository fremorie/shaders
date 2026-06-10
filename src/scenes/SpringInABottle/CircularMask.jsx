import { Mask, useGLTF } from '@react-three/drei'

export const CircularMask = (props) => {
    const { nodes } = useGLTF('./models/MagicGlass.glb')

    return (
        <group {...props}>
            <Mask
                id={1}
                geometry={nodes.MagicGlas001.geometry}
                position={[-1.054, 1.093, 0.012]}
            />
        </group>
    )
}

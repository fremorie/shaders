import { useGLTF, useMask } from '@react-three/drei'

export function WinterModel() {
    const stencil = useMask(1, true)

    const { nodes } = useGLTF('./models/Spring/Spring3.glb')

    return (
        <group rotation-y={Math.PI / 1.2} position-y={-0.5} dispose={null}>
            <mesh
                geometry={nodes.merged.geometry}
                position={[-0.871, 0.616, 0.325]}
            >
                <meshBasicMaterial {...stencil} />
            </mesh>
            <mesh
                geometry={nodes.river.geometry}
                position={[-0.251, 0.508, 0.127]}
            >
                <meshBasicMaterial {...stencil} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Spring/Spring3.glb')

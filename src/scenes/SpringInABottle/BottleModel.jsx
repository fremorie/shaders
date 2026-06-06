import { useGLTF } from '@react-three/drei'

export function BottleModel({ position }) {
    const { nodes } = useGLTF('./models/Bottle.glb')

    return (
        <group position={position}>
            <mesh geometry={nodes.Bottle.geometry} position={[0, 0.1, 0]}>
                <meshPhysicalMaterial
                    transparent
                    transmission={0.9}
                    roughness={0.01}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Bottle.glb')

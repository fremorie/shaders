import { useGLTF, useMask } from '@react-three/drei'

export function BottleModel({ position }) {
    const { nodes } = useGLTF('./models/Bottle.glb')
    const stencil = useMask(1, true)

    return (
        <group position={position}>
            <mesh geometry={nodes.Bottle.geometry} position={[0, 0.1, 0]}>
                <meshPhysicalMaterial
                    transparent
                    transmission={0.9}
                    roughness={0}
                    reflectivity={0.1}
                    iridiscence={0.5}
                    {...stencil}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Bottle.glb')

import { useGLTF } from '@react-three/drei'
import { useControls, folder } from 'leva'

export function BottleModel({ position }) {
    const { nodes } = useGLTF('./models/BottleWithAHole.glb')

    const controls = useControls({
        'Bottle material': folder({
            transmission: { value: 0.88, min: 0, max: 1 },
            roughness: { value: 0.18, min: 0, max: 1 },
            reflectivity: { value: 0, min: 0, max: 1 },
            iridescence: { value: 0, min: 0, max: 1 },
            thickness: { value: 0, min: 0, max: 1 },
        }),
    })

    return (
        <group position={position}>
            <mesh
                geometry={nodes.BottleWithAHole.geometry}
                position={[-0.023, 0.1, 0.011]}
                renderOrder={2}
            >
                <meshPhysicalMaterial
                    transparent
                    depthWrite={true}
                    transmission={controls.transmission}
                    roughness={controls.roughness}
                    reflectivity={controls.reflectivity}
                    iridescence={controls.iridescence}
                    thickness={controls.thickness}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/BottleWithAHole.glb')

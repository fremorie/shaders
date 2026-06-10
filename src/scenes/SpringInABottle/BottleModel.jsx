import { useGLTF, useMask } from '@react-three/drei'
import { folder, useControls } from 'leva'

export function BottleModel({ position, store }) {
    const { nodes } = useGLTF('./models/Bottle.glb')
    const stencil = useMask(1, true)

    const controls = useControls(
        {
            'Bottle material': folder({
                transmission: { value: 0.87, min: 0, max: 1 },
                roughness: { value: 0.4, min: 0, max: 1 },
                reflectivity: { value: 0, min: 0, max: 1 },
                iridescence: { value: 0, min: 0, max: 1 },
            }),
        },
        { store }
    )

    return (
        <group position={position}>
            <mesh geometry={nodes.Bottle.geometry} position={[0, 0.1, 0]}>
                <meshPhysicalMaterial
                    transparent
                    transmission={controls.transmission}
                    roughness={controls.roughness}
                    reflectivity={controls.reflectivity}
                    iridescence={controls.iridescence}
                    {...stencil}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Bottle.glb')

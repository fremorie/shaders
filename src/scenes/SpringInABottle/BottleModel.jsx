import { useGLTF } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { RENDER_ORDER } from './utils/renderOrder.js'

export function BottleModel({ position, store }) {
    const { nodes } = useGLTF('./models/BottleWithAHole.glb')

    const controls = useControls(
        {
            'Bottle material': folder({
                transmission: { value: 0.96, min: 0, max: 1 },
                roughness: { value: 0.01, min: 0, max: 1 },
                reflectivity: { value: 0, min: 0, max: 1 },
                iridescence: { value: 0, min: 0, max: 1 },
            }),
        },
        { store }
    )

    return (
        <group position={position}>
            <mesh
                geometry={nodes.BottleWithAHole.geometry}
                position={[-0.023, 0.1, 0.011]}
                renderOrder={RENDER_ORDER.bottle}
            >
                <meshPhysicalMaterial
                    transparent
                    depthWrite={false}
                    transmission={controls.transmission}
                    roughness={controls.roughness}
                    reflectivity={controls.reflectivity}
                    iridescence={controls.iridescence}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Bottle.glb')

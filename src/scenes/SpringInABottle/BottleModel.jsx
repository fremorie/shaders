import { useGLTF } from '@react-three/drei'
import { folder, useControls } from 'leva'

import { RENDER_ORDER } from './utils/renderOrder'

export function BottleModel({ position, store }) {
    const { nodes } = useGLTF('./models/BottleWithAHole.glb')

    const controls = useControls(
        {
            'Bottle material': folder({
                transmission: { value: 0.88, min: 0, max: 1 },
                roughness: { value: 0.18, min: 0, max: 1 },
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
                    depthWrite={true}
                    transmission={0}
                    opacity={0.2}
                    roughness={controls.roughness}
                    reflectivity={controls.reflectivity}
                    iridescence={controls.iridescence}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/BottleWithAHole.glb')

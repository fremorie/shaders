import { useGLTF, useTexture } from '@react-three/drei'

export function SpringModel() {
    const { nodes } = useGLTF('./models/Spring/Spring3.glb')
    const bakedTexture = useTexture('./models/Spring/baked.jpg')

    // eslint-disable-next-line
    bakedTexture.flipY = false

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.merged.geometry}
                position={[-0.871, 0.616, 0.325]}
            >
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <mesh
                geometry={nodes.river.geometry}
                position={[-0.251, 0.508, 0.127]}
            >
                <meshBasicMaterial color={'#23938a'} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Spring/Spring3.glb')
useTexture.preload('./models/Spring/baked.jpg')

import { useGLTF, useMask, useTexture } from '@react-three/drei'

export function WinterModel() {
    const stencil = useMask(1)

    const { nodes } = useGLTF('./models/Winter/WinterMerged.glb')
    const bakedTexture = useTexture('./models/Winter/BakedWinter.jpg')
    // eslint-disable-next-line
    bakedTexture.flipY = false

    return (
        <group rotation-y={Math.PI / 1.2} position-y={-0.5} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.river001.geometry}
                position={[-0.251, 0.508, 0.127]}
            >
                <meshPhysicalMaterial
                    anisotropy={0.5}
                    roughness={0.1}
                    color="#767D93"
                    {...stencil}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.snow.geometry}
                position={[0.005, 0.284, -0.003]}
            >
                <meshBasicMaterial map={bakedTexture} {...stencil} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.merged001.geometry}
                position={[0.385, 0.863, -0.803]}
            >
                <meshBasicMaterial map={bakedTexture} {...stencil} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Winter/WinterMerged.glb')

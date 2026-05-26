import {
    OrbitControls,
    Text3D,
    Center,
    useMatcapTexture,
    Float,
} from '@react-three/drei'

export function Home() {
    const [matcapTexture] = useMatcapTexture('C7C7D7_4C4E5A_818393_6C6C74', 256)

    return (
        <>
            <OrbitControls makeDefault />

            <Center>
                <Float>
                    <Text3D
                        font={'./fonts/helvetiker_regular.typeface.json'}
                        size={0.35}
                        height={0.2}
                        curveSegments={12}
                        bevelEnabled={true}
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                    >
                        All kinds of shaders
                        <meshMatcapMaterial matcap={matcapTexture} />
                    </Text3D>
                </Float>
            </Center>
        </>
    )
}

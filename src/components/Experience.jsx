import { OrbitControls, Sky } from '@react-three/drei'

export function Experience() {
    return (
        <>
            <Sky />

            <OrbitControls makeDefault />

            <mesh>
                <boxGeometry />
                <meshBasicMaterial />
            </mesh>
        </>
    )
}
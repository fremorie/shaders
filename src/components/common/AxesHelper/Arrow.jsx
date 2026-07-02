export function Arrow({ size, material, ...props }) {
    return (
        <group {...props}>
            <mesh
                rotation={[0, 0, Math.PI / 2]}
                position-x={size / 2}
                material={material}
            >
                <cylinderGeometry args={[0.01, 0.01, size]} />
            </mesh>
            <mesh
                rotation={[0, 0, -Math.PI / 2]}
                position-x={size + 0.025}
                material={material}
            >
                <coneGeometry args={[0.05, 0.2]} />
            </mesh>
        </group>
    )
}

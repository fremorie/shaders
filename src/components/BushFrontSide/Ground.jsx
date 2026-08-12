import * as THREE from 'three'

export function Ground() {
    return (
        <mesh
            receiveShadow
            position-y={0}
            rotation-x={-Math.PI * 0.5}
            scale={150}
        >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
        </mesh>
    )
}

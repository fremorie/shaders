import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'

import { Perf } from 'r3f-perf'
import { Explanation } from '../../components/layout/Explanation/Explanation.jsx'

export function BottledSakura() {
    const bottle = useGLTF('./models/Bottle.glb')
    const { nodes, materials } = useGLTF('./models/Sakura_scene.glb')

    return (
        <>
            <Canvas gl={{ stencil: true }} shadows>
                <color args={['#ffffff']} attach="background" />
                <OrbitControls makeDefault />
                <Perf />
                <Stage>
                    <group dispose={null} position={[0, 0, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={bottle.nodes.Bottle.geometry}
                            position={[0, 0.1, 0]}
                        >
                            <meshPhysicalMaterial
                                transparent
                                transmission={0.9}
                                roughness={0.01}
                            />
                        </mesh>
                    </group>
                    <group dispose={null} position={[0, 0, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes['Ground-spring001'].geometry}
                            material={materials.Snow}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Big_tree002.geometry}
                            material={materials.Trunk}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere013.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere014.geometry}
                            material={materials['spring-leaves']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere015.geometry}
                            material={materials['spring-leaves']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere016.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere017.geometry}
                            material={materials['spring-leaves']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere018.geometry}
                            material={materials['spring-leaves']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere019.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere020.geometry}
                            material={materials['spring-leaves']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere021.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere022.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere023.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere024.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere025.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-8.958, 0, -24.503]}
                        />
                    </group>
                </Stage>
            </Canvas>
            <Explanation title="Credits">
                <p>
                    This model was created with the help of Copperthumb's
                    tutorial:
                </p>
                <p>
                    <a
                        href="https://www.youtube.com/watch?v=MoeLC3F0p7o"
                        target="blank"
                    >
                        https://www.youtube.com/watch?v=MoeLC3F0p7o
                    </a>
                </p>
            </Explanation>
        </>
    )
}

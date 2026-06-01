import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { Explanation } from '../../components/layout/Explanation/Explanation'

export function SakuraV2() {
    const { nodes, materials } = useGLTF('./models/Sakura_v2.glb')

    return (
        <>
            <Canvas gl={{ stencil: true }}>
                <color args={['#ffffff']} attach="background" />
                <OrbitControls makeDefault />
                <Perf />
                <Stage>
                    <group dispose={null} rotation-y={Math.PI / 2}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Big_tree001.geometry}
                            material={materials.Trunk}
                            position={[-2.95, 1.362, 9.981]}
                            scale={1.181}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.956, 2.589, 10.523]}
                            rotation={[1.523, -0.026, 0.076]}
                            scale={0.142}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere001.geometry}
                            material={materials['spring-leaves']}
                            position={[-2.893, 2.545, 9.318]}
                            rotation={[1.503, -0.772, 0.031]}
                            scale={0.148}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere002.geometry}
                            material={materials['spring-leaves']}
                            position={[-2.762, 2.766, 9.896]}
                            rotation={[1.522, 0.024, -0.881]}
                            scale={0.245}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere003.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-3.183, 2.328, 9.989]}
                            rotation={[-2.345, -0.023, 0.154]}
                            scale={0.114}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere004.geometry}
                            material={materials['spring-leaves']}
                            position={[-2.82, 2.605, 10.277]}
                            rotation={[2.9, -0.026, 0.076]}
                            scale={0.127}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere005.geometry}
                            material={materials['spring-leaves']}
                            position={[-2.932, 2.633, 9.731]}
                            rotation={[2.437, 0.497, 1.583]}
                            scale={0.241}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere006.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.864, 2.687, 10.093]}
                            rotation={[0.108, -0.978, 2.431]}
                            scale={0.174}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere007.geometry}
                            material={materials['spring-leaves']}
                            position={[-3.133, 2.33, 9.89]}
                            rotation={[-2.088, -0.07, -1.18]}
                            scale={0.083}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere008.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.926, 2.541, 9.484]}
                            rotation={[-2.476, 0.359, -0.897]}
                            scale={0.15}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere009.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.934, 2.419, 9.608]}
                            rotation={[1.076, 0.868, -2.899]}
                            scale={0.085}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere010.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.992, 2.474, 9.691]}
                            rotation={[1.976, 0.4, 2.329]}
                            scale={0.085}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere011.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.953, 2.318, 9.963]}
                            rotation={[1.076, 0.868, -2.899]}
                            scale={0.116}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Icosphere012.geometry}
                            material={materials['spring-leaves-dark']}
                            position={[-2.796, 2.492, 10.329]}
                            rotation={[1.394, -0.092, -2.85]}
                            scale={0.058}
                        />
                    </group>
                </Stage>
            </Canvas>
            <Explanation title="Credits">
                <p>
                    This model was created with the help of Grant Abbitt's
                    tutorial:
                </p>
                <p>
                    <a
                        href="https://www.youtube.com/watch?v=p-9pgZI3inI"
                        target="blank"
                    >
                        https://www.youtube.com/watch?v=p-9pgZI3inI
                    </a>
                </p>
            </Explanation>
        </>
    )
}

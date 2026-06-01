import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { Explanation } from '../../components/layout/Explanation/Explanation'

export function Sakura() {
    const { nodes, materials } = useGLTF('./models/Sakura.glb')

    return (
        <>
            <Canvas gl={{ stencil: true }}>
                <color args={['#ffffff']} attach="background" />
                <OrbitControls makeDefault />
                <Perf />
                <Stage>
                    <group dispose={null} rotation-y={-Math.PI / 2}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes['Tree-base'].geometry}
                            material={materials.Material}
                            position={[0.014, 0.781, 3.477]}
                            scale={0.16}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_1.geometry}
                            material={materials.leaves}
                            position={[0.224, 1.399, 3.941]}
                            rotation={[-0.199, 0.05, 0.379]}
                            scale={0.098}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_2.geometry}
                            material={materials.leaves}
                            position={[0.058, 1.434, 3.634]}
                            rotation={[-0.927, -0.01, 0.91]}
                            scale={0.187}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_3.geometry}
                            material={materials.leaves}
                            position={[0.126, 1.379, 3.799]}
                            rotation={[-0.927, -0.01, 0.91]}
                            scale={0.077}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_4.geometry}
                            material={materials.leaves}
                            position={[0.007, 1.43, 3.386]}
                            rotation={[1.993, 0.143, 3.006]}
                            scale={0.132}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_5.geometry}
                            material={materials.leaves}
                            position={[0.055, 1.445, 3.197]}
                            rotation={[-0.927, -0.01, 0.91]}
                            scale={0.155}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_6.geometry}
                            material={materials.leaves}
                            position={[0.178, 1.49, 3.816]}
                            rotation={[2.008, -0.083, 2.523]}
                            scale={0.132}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_7.geometry}
                            material={materials.leaves}
                            position={[0.068, 1.604, 3.502]}
                            rotation={[-3.139, 0.562, 2.596]}
                            scale={0.179}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_8.geometry}
                            material={materials.leaves}
                            position={[0.038, 1.49, 3.819]}
                            rotation={[2.087, 0.548, 2.197]}
                            scale={0.092}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_8001.geometry}
                            material={materials.leaves}
                            position={[0.061, 1.595, 3.302]}
                            rotation={[2.087, 0.548, 2.197]}
                            scale={0.092}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Tree_Crown_8002.geometry}
                            material={materials.leaves}
                            position={[0.151, 1.503, 3.38]}
                            rotation={[0.519, 0.526, 2.758]}
                            scale={0.066}
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

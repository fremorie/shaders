import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Stage, useGLTF } from '@react-three/drei'

import { Perf } from 'r3f-perf'
import { Explanation } from '../../components/layout/Explanation/Explanation.jsx'

export function GlassBottle() {
    const { nodes } = useGLTF('./models/Bottle_smoothed.glb')

    return (
        <>
            <Canvas gl={{ stencil: true }}>
                <color args={['#ffffff']} attach="background" />
                <OrbitControls makeDefault />
                <Perf />
                <Stage>
                    <group dispose={null}>
                        <Float>
                            <mesh position-y={1}>
                                <boxGeometry />
                                <meshStandardMaterial color="mediumpurple" />
                            </mesh>
                        </Float>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Bottle.geometry}
                            position={[0, 0.1, 0]}
                        >
                            <meshPhysicalMaterial
                                transparent
                                transmission={0.9}
                                roughness={0.01}
                            />
                        </mesh>
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

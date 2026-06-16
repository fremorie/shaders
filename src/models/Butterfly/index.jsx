import { Canvas } from '@react-three/fiber'
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react'

const ButterflyModel = () => {
    const group = useRef(null)
    const { nodes, animations } = useGLTF('./models/Butterfly.glb')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        if (actions?.ArmatureAction) {
            actions.ArmatureAction.play()
            actions.ArmatureAction.timeScale = 3.0;
        }
    }, [actions?.ArmatureAction])

    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <group name="Armature" position={[0, 0.015, 0.017]}>
                    <primitive object={nodes.ButterflyBody} />
                    <primitive object={nodes.UpperWingR} />
                    <primitive object={nodes.LowerWingR} />
                    <primitive object={nodes.UpperWingL} />
                    <primitive object={nodes.LowerWingL} />
                </group>
            </group>
        </group>
    )
}

export function Butterfly() {
    return (
        <>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [1, 0.5, 1],
                }}
            >
                <color args={['#ffffff']} attach="background" />
                <OrbitControls makeDefault autoRotate />
                <directionalLight position={2, 2, 2}/>
                <Perf />
                <ButterflyModel />
                <axesHelper />
            </Canvas>
        </>
    )
}

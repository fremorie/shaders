import { useEffect, useMemo, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import { SkeletonUtils } from 'three-stdlib'

export const ButterflyModel = ({ position, material, rotation }) => {
    const group = useRef(null)
    const { scene, animations } = useGLTF('./models/Butterfly.glb')
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes } = useGraph(clonedScene)
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        if (actions?.ArmatureAction) {
            actions.ArmatureAction.play()
            // eslint-disable-next-line
            actions.ArmatureAction.timeScale = 3.0
        }
    }, [actions?.ArmatureAction])

    useEffect(() => {
        if (!material) return
        Object.values(nodes).forEach((node) => {
            if (node.isMesh) {
                node.material = material
            }
        })
    }, [nodes, material])

    return (
        <group
            ref={group}
            position={position}
            rotation={rotation}
            dispose={null}
        >
            <group name="Scene">
                <group name="Armature" position={[0, 0.015, 0.017]}>
                    <primitive
                        object={nodes.ButterflyBody}
                        material={material}
                    />
                    <primitive object={nodes.UpperWingR} />
                    <primitive object={nodes.LowerWingR} />
                    <primitive object={nodes.UpperWingL} />
                    <primitive object={nodes.LowerWingL} />
                </group>
            </group>
        </group>
    )
}

import { useRef } from 'react'
import { useGLTF, shaderMaterial, useMask } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

import vertexShader from './shaders/magicGlass/vertex.glsl'
import fragmentShader from './shaders/magicGlass/fragment.glsl'

const MagicGlassMaterial = shaderMaterial(
    {
        uTime: 0,
        uPerlinNoise: null,
    },
    vertexShader,
    fragmentShader
)

extend({ MagicGlassMaterial })

export function MagicGlass() {
    const { nodes } = useGLTF('./models/MagicGlass.glb')
    const stencil = useMask(1)

    const magicGlassMaterialRef = useRef(null)

    useFrame((state, delta) => {
        if (magicGlassMaterialRef.current) {
            magicGlassMaterialRef.current.uTime += delta
        }
    })

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.MagicGlas001.geometry}
                position={[-1.054, 1.093, 0.012]}
            >
                <magicGlassMaterial
                    key={MagicGlassMaterial.key}
                    ref={magicGlassMaterialRef}
                    transparent
                    depthWrite={false}
                    {...stencil}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/MagicGlass.glb')

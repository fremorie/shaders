import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, shaderMaterial, useMask } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'

import vertexShader from './shaders/magicGlass/vertex.glsl'
import fragmentShader from './shaders/magicGlass/fragment.glsl'
import { MASK_ID } from './utils/stencilBuffer'
import { useControls } from 'leva'

const MagicGlassMaterial = shaderMaterial(
    {
        uTime: 0,
        uPerlinNoise: null,
        uColorStart: new THREE.Color('#c8d7eb'),
        uColorEnd: new THREE.Color('#8fa1c4'),
    },
    vertexShader,
    fragmentShader
)

extend({ MagicGlassMaterial })

export function MagicGlass({ store }) {
    const { nodes } = useGLTF('./models/MagicGlass.glb')
    const stencil = useMask(MASK_ID)

    const magicGlassMaterialRef = useRef(null)

    const { uColorStart, uColorEnd } = useControls(
        'Magic glass',
        {
            uColorStart: '#c8d7eb',
            uColorEnd: '#8fa1c4',
        },
        { store }
    )
    useEffect(() => {
        magicGlassMaterialRef.current.uColorStart.set(uColorStart)
        magicGlassMaterialRef.current.uColorEnd.set(uColorEnd)
    }, [uColorStart, uColorEnd])

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

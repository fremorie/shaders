import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

import vertexShader from './shaders/magicGlass/vertex.glsl'
import fragmentShader from './shaders/magicGlass/fragment.glsl'
import useSceneState, { SEASONS } from './store/useSceneState'

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
    const activeSeason = useSceneState((state) => state.activeSeason)

    const { nodes } = useGLTF('./models/MagicGlass.glb')

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

    useEffect(() => {
        if (activeSeason === SEASONS.winter) {
            magicGlassMaterialRef.current.uColorStart.set('#ffffff')
            magicGlassMaterialRef.current.uColorEnd.set('#f5cf1d')
        }
    }, [activeSeason])

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
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/MagicGlass.glb')

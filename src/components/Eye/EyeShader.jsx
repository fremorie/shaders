import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export function EyeShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uTime: new THREE.Uniform(0),
            uResolution: new THREE.Uniform(new THREE.Vector2(width, height)),
            uBaseColor: new THREE.Uniform(new THREE.Color(0.2, 0.3, 0.4)),
            uNoiseColor: new THREE.Uniform(new THREE.Color(0.2, 0.5, 0.4)),
            uCenterColor: new THREE.Uniform(new THREE.Color(0.9, 0.6, 0.2)),
            uStripesColor: new THREE.Uniform(new THREE.Color(1.0, 1.0, 1.0)),
            uStripesNoiseStrength: new THREE.Uniform(0.5),
            uVignetteStrength: new THREE.Uniform(0.5),
            uPupilRadius: new THREE.Uniform(0.2),
            uReflectionColor: new THREE.Uniform(new THREE.Color(1.0, 0.9, 0.8)),
            uReflectionSize: new THREE.Uniform(0.2),

        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // intentionally empty: uniform objects are created once; useEffect mutates .value to sync controls
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.x = width
            materialRef.current.uniforms.uResolution.value.y = height
        }
    }, [width, height])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh scale={[width, height, 1]}>
            <planeGeometry />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

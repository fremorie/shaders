import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { useControls, folder } from 'leva'

export function SpiralShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const controls = useControls({
        'Cosine Palette': folder({
            uBias: { r: 0.86 * 255, g: 0.62 * 255, b: 0.55 * 255 },
            uAmplitude: { r: 0.4 * 255, g: 0.41 * 255, b: 0.53 * 255 },
            uFrequency: { x: 2.0, y: 1.0, z: 1.0 },
            uPhase: { x: 0, y: 0.25, z: 0.25 },
        }),
        General: folder({
            uSpeed: { value: 1.5, min: 0, max: 10, step: 0.01 },
        }),
    })

    const uniforms = useMemo(
        () => ({
            uTime: new THREE.Uniform(0),
            uResolution: new THREE.Uniform(new THREE.Vector2(width, height)),
            uSpeed: new THREE.Uniform(controls.uSpeed),

            uBias: new THREE.Uniform(new THREE.Vector3(controls.uBias.r / 255, controls.uBias.g / 255, controls.uBias.b / 255)),
            uAmplitude: new THREE.Uniform(new THREE.Vector3(controls.uAmplitude.r / 255, controls.uAmplitude.g / 255, controls.uAmplitude.b / 255)),
            uFrequency: new THREE.Uniform(new THREE.Vector3(controls.uFrequency.x, controls.uFrequency.y, controls.uFrequency.z)),
            uPhase: new THREE.Uniform(new THREE.Vector3(controls.uPhase.x, controls.uPhase.y, controls.uPhase.z)),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // intentionally empty: uniform objects are created once; useEffect mutates .value to sync controls
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.x = width
            materialRef.current.uniforms.uResolution.value.y = height

            materialRef.current.uniforms.uSpeed.value = controls.uSpeed

            materialRef.current.uniforms.uBias.value = new THREE.Vector3(
                controls.uBias.r / 255,
                controls.uBias.g / 255,
                controls.uBias.b / 255
            )
            materialRef.current.uniforms.uAmplitude.value = new THREE.Vector3(
                controls.uAmplitude.r / 255,
                controls.uAmplitude.g / 255,
                controls.uAmplitude.b / 255
            )

            materialRef.current.uniforms.uFrequency.value = new THREE.Vector3(
                controls.uFrequency.x,
                controls.uFrequency.y,
                controls.uFrequency.z
            )
            materialRef.current.uniforms.uPhase.value = new THREE.Vector3(
                controls.uPhase.x,
                controls.uPhase.y,
                controls.uPhase.z
            )
        }
    }, [width, height, controls])

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

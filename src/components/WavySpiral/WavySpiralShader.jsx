import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { useControls, folder } from 'leva'

export function WavySpiralShader({ store }) {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const controls = useControls(
        {
            'Cosine Palette': folder({
                uUseCosinePalette: { value: true, label: 'Use cosine palette' },
                uBias: { r: 0.5 * 255, g: 0.56 * 255, b: 0.717 * 255 },
                uAmplitude: { r: 0.192 * 255, g: 0.345 * 255, b: 0.239 * 255 },
                uFrequency: { x: 2.0, y: 1.0, z: 1.0 },
                uPhase: { x: 0, y: 0.25, z: 0.25 },
            }),
            General: folder({
                uSpiralSpeed: { value: 1.5, min: 0, max: 10, step: 0.01 },
                uEdgesSpeed: { value: 2.5, min: 0, max: 10, step: 0.01 },
            }),
        },
        { store }
    )

    const uniforms = useMemo(
        () => ({
            uTime: new THREE.Uniform(0),
            uResolution: new THREE.Uniform(new THREE.Vector2(width, height)),
            uSpiralSpeed: new THREE.Uniform(controls.uSpiralSpeed),
            uEdgesSpeed: new THREE.Uniform(controls.uEdgesSpeed),
            uUseCosinePalette: new THREE.Uniform(controls.uUseCosinePalette),

            uBias: new THREE.Uniform(
                new THREE.Vector3(
                    controls.uBias.r / 255,
                    controls.uBias.g / 255,
                    controls.uBias.b / 255
                )
            ),
            uAmplitude: new THREE.Uniform(
                new THREE.Vector3(
                    controls.uAmplitude.r / 255,
                    controls.uAmplitude.g / 255,
                    controls.uAmplitude.b / 255
                )
            ),
            uFrequency: new THREE.Uniform(
                new THREE.Vector3(
                    controls.uFrequency.x,
                    controls.uFrequency.y,
                    controls.uFrequency.z
                )
            ),
            uPhase: new THREE.Uniform(
                new THREE.Vector3(
                    controls.uPhase.x,
                    controls.uPhase.y,
                    controls.uPhase.z
                )
            ),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // intentionally empty: uniform objects are created once; useEffect mutates .value to sync controls
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.x = width
            materialRef.current.uniforms.uResolution.value.y = height

            materialRef.current.uniforms.uSpiralSpeed.value =
                controls.uSpiralSpeed
            materialRef.current.uniforms.uEdgesSpeed.value =
                controls.uEdgesSpeed
            materialRef.current.uniforms.uUseCosinePalette.value =
                controls.uUseCosinePalette

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

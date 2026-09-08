import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { folder, useControls } from 'leva'

const EYE_DEFAULTS = {
    baseColor: '#8eb6d8',
    noiseColor: '#317c67',
    centerColor: '#b4a072',
    stripesColor: '#b7e2d9',
    stripesNoiseStrength: 0.5,
    pupilRadius: 0.2,
    pupilDilation: 0.12,
    vignetteStrength: 0.5,
    reflectionColor: '#fff3e7',
    reflectionSize: 0.2,
}

export function EyeShader({ store }) {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uTime: new THREE.Uniform(0),
            uResolution: new THREE.Uniform(new THREE.Vector2(width, height)),
            uBaseColor: new THREE.Uniform(
                new THREE.Color(EYE_DEFAULTS.baseColor)
            ),
            uNoiseColor: new THREE.Uniform(
                new THREE.Color(EYE_DEFAULTS.noiseColor)
            ),
            uCenterColor: new THREE.Uniform(
                new THREE.Color(EYE_DEFAULTS.centerColor)
            ),
            uStripesColor: new THREE.Uniform(
                new THREE.Color(EYE_DEFAULTS.stripesColor)
            ),
            uStripesNoiseStrength: new THREE.Uniform(
                EYE_DEFAULTS.stripesNoiseStrength
            ),
            uVignetteStrength: new THREE.Uniform(EYE_DEFAULTS.vignetteStrength),
            uPupilRadius: new THREE.Uniform(EYE_DEFAULTS.pupilRadius),
            uPupilDilation: new THREE.Uniform(EYE_DEFAULTS.pupilDilation),
            uReflectionColor: new THREE.Uniform(
                new THREE.Color(EYE_DEFAULTS.reflectionColor)
            ),
            uReflectionSize: new THREE.Uniform(EYE_DEFAULTS.reflectionSize),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // intentionally empty: uniform objects are created once; useEffect mutates .value to sync controls
    )

    const {
        uBaseColor,
        uNoiseColor,
        uCenterColor,
        uStripesColor,
        uStripesNoiseStrength,
        uPupilRadius,
        uPupilDilation,
        uVignetteStrength,
        uReflectionColor,
        uReflectionSize,
    } = useControls(
        {
            Eye: folder({
                uBaseColor: EYE_DEFAULTS.baseColor,
                uNoiseColor: EYE_DEFAULTS.noiseColor,
                uCenterColor: EYE_DEFAULTS.centerColor,
                uStripesColor: EYE_DEFAULTS.stripesColor,
                uStripesNoiseStrength: {
                    value: EYE_DEFAULTS.stripesNoiseStrength,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
                // max stays clear of IRIS_RADIUS so the iris ring never collapses
                uPupilRadius: {
                    value: EYE_DEFAULTS.pupilRadius,
                    min: 0.02,
                    max: 0.6,
                    step: 0.01,
                },
                uPupilDilation: {
                    value: EYE_DEFAULTS.pupilDilation,
                    min: 0,
                    max: 0.4,
                    step: 0.01,
                },
            }),
            Vignette: folder({
                uVignetteStrength: {
                    value: EYE_DEFAULTS.vignetteStrength,
                    min: 0,
                    max: 1,
                    step: 0.01,
                },
            }),
            Reflection: folder({
                uReflectionColor: EYE_DEFAULTS.reflectionColor,
                // min stays above 0: smoothstep(0.0, uReflectionSize, ...) divides by the edge gap
                uReflectionSize: {
                    value: EYE_DEFAULTS.reflectionSize,
                    min: 0.01,
                    max: 1,
                    step: 0.01,
                },
            }),
        },
        { store }
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.x = width
            materialRef.current.uniforms.uResolution.value.y = height

            materialRef.current.uniforms.uBaseColor.value.set(uBaseColor)
            materialRef.current.uniforms.uNoiseColor.value.set(uNoiseColor)
            materialRef.current.uniforms.uCenterColor.value.set(uCenterColor)
            materialRef.current.uniforms.uStripesColor.value.set(uStripesColor)
            materialRef.current.uniforms.uStripesNoiseStrength.value =
                uStripesNoiseStrength
            materialRef.current.uniforms.uVignetteStrength.value =
                uVignetteStrength
            materialRef.current.uniforms.uPupilRadius.value = uPupilRadius
            materialRef.current.uniforms.uPupilDilation.value = uPupilDilation
            materialRef.current.uniforms.uReflectionColor.value.set(
                uReflectionColor
            )
            materialRef.current.uniforms.uReflectionSize.value = uReflectionSize
        }
    }, [
        width,
        height,
        uBaseColor,
        uNoiseColor,
        uCenterColor,
        uStripesColor,
        uStripesNoiseStrength,
        uVignetteStrength,
        uPupilRadius,
        uPupilDilation,
        uReflectionColor,
        uReflectionSize,
    ])

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

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import { useControls } from 'leva'

import vertexShader from '../../shaders/coloredGradientStripes/vertex.glsl'
import fragmentShader from '../../shaders/coloredGradientStripes/fragment.glsl'

export function ColoredGradientStripesShader({ store }) {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const { uRepeatCount, uRedStrength, uGreenStrength, uBlueStrength } =
        useControls(
            {
                uRepeatCount: { value: 10, min: 0, max: 100, step: 1 },
                uRedStrength: { value: 0.65, min: 0, max: 1 },
                uGreenStrength: { value: 0.67, min: 0, max: 1 },
                uBlueStrength: { value: 1, min: 0, max: 1 },
            },
            { store }
        )

    const uniforms = useMemo(
        () => ({
            uRepeatCount: new THREE.Uniform(10),
            uRedStrength: new THREE.Uniform(0.65),
            uGreenStrength: new THREE.Uniform(0.67),
            uBlueStrength: new THREE.Uniform(1),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uRepeatCount.value = uRepeatCount
            materialRef.current.uniforms.uRedStrength.value = uRedStrength
            materialRef.current.uniforms.uGreenStrength.value = uGreenStrength
            materialRef.current.uniforms.uBlueStrength.value = uBlueStrength
        }
    }, [uRepeatCount, uRedStrength, uGreenStrength, uBlueStrength])

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

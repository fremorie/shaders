import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import { useControls } from 'leva'

import vertexShader from '../../shaders/point/vertex.glsl'
import fragmentShader from '../../shaders/point/fragment.glsl'

export function VignetteShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const { uHaloThreshold, uScale } = useControls({
        uHaloThreshold: { value: 0.1, min: 0, max: 1 },
        uScale: { value: 0.05, min: 0, max: 1 },
    })

    const uniforms = useMemo(
        () => ({
            uHaloThreshold: new THREE.Uniform(0.1),
            uScale: new THREE.Uniform(0.05),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uHaloThreshold.value = uHaloThreshold
            materialRef.current.uniforms.uScale.value = uScale
        }
    }, [uHaloThreshold, uScale])

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

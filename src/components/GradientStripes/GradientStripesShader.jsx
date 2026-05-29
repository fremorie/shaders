import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import { useControls } from 'leva'

import vertexShader from '../../shaders/gradientStripes/vertex.glsl'
import fragmentShader from '../../shaders/gradientStripes/fragment.glsl'

export function GradientStripesShader({ store }) {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const { uRepeatCount } = useControls(
        {
            uRepeatCount: { value: 10, min: 0, max: 100, step: 1 },
        },
        { store }
    )

    const uniforms = useMemo(
        () => ({
            uRepeatCount: new THREE.Uniform(10),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uRepeatCount.value = uRepeatCount
        }
    }, [uRepeatCount])

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

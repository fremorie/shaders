import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import { useControls } from 'leva'

import vertexShader from '../../shaders/stripes/vertex.glsl'
import fragmentShader from '../../shaders/stripes/fragment.glsl'

export function StripesShader({ store }) {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const { uRepeatCount, uModulo } = useControls(
        {
            uRepeatCount: { value: 5, min: 0, max: 10 },
            uModulo: { value: 1, min: 0, max: 10 },
        },
        { store }
    )

    const uniforms = useMemo(
        () => ({
            uRepeatCount: new THREE.Uniform(5),
            uModulo: new THREE.Uniform(1),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uRepeatCount.value = uRepeatCount
            materialRef.current.uniforms.uModulo.value = uModulo
        }
    }, [uRepeatCount, uModulo])

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

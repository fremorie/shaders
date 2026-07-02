import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export function MatricesShader({ transformationMatrix }) {
    const materialRef = useRef(null)
    const meshRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uTransformationMatrix: new THREE.Uniform(
                new THREE.Matrix4(
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1
                )
            ),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTransformationMatrix.value.copy(
                transformationMatrix
            )
        }
    }, [transformationMatrix])

    return (
        <mesh ref={meshRef}>
            <boxGeometry />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

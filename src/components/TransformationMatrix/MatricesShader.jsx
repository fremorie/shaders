import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import { IDENTITY_MATRIX_ELEMENTS } from './utils'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { folder, useControls } from 'leva'

export function MatricesShader({ store, transformationMatrix }) {
    const materialRef = useRef(null)
    const meshRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uTransformationMatrix: new THREE.Uniform(
                new THREE.Matrix4(...IDENTITY_MATRIX_ELEMENTS)
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

    const { wireframe } = useControls(
        {
            Cube: folder({
                wireframe: {
                    value: false,
                },
            }),
        },
        { store }
    )

    return (
        <mesh ref={meshRef}>
            <boxGeometry />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                wireframe={wireframe}
            />
        </mesh>
    )
}

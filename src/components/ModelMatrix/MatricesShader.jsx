import { useEffect, useMemo, useRef } from 'react'

import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { folder, useControls } from 'leva'
import * as THREE from 'three'
import { IDENTITY_MATRIX_ELEMENTS } from '../TransformationMatrix/utils.js'

export function MatricesShader({ store, modelMatrix }) {
    const materialRef = useRef(null)
    const meshRef = useRef(null)

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

    const uniforms = useMemo(
        () => ({
            uModelMatrix: new THREE.Uniform(
                new THREE.Matrix4(...IDENTITY_MATRIX_ELEMENTS)
            ),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uModelMatrix.value.copy(modelMatrix)
        }
    }, [modelMatrix])

    return (
        <mesh ref={meshRef}>
            <boxGeometry />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                wireframe={wireframe}
                uniforms={uniforms}
            />
        </mesh>
    )
}

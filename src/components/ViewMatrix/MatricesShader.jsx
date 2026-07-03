import { useEffect, useMemo, useRef } from 'react'
import { folder, useControls } from 'leva'
import * as THREE from 'three'

import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { DEFAULT_VIEW_MATRIX_ELEMENTS } from './utils'

export function MatricesShader({ store, viewMatrix }) {
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
            uViewMatrix: new THREE.Uniform(
                new THREE.Matrix4(...DEFAULT_VIEW_MATRIX_ELEMENTS)
            ),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uViewMatrix.value.copy(viewMatrix)
        }
    }, [viewMatrix])

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

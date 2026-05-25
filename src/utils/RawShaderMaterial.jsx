import { forwardRef, useMemo } from 'react'
import * as THREE from 'three'

export const RawShaderMaterial = forwardRef(
    (
        {
            vertexShader,
            fragmentShader,
            uniforms = {},
            transparent = false,
            wireframe = false,
            side = THREE.FrontSide,
        },
        ref
    ) => {
        const material = useMemo(() => {
            return new THREE.RawShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms,
                transparent,
                wireframe,
                side,
            })
        }, [
            vertexShader,
            fragmentShader,
            uniforms,
            transparent,
            wireframe,
            side,
        ])

        return <primitive object={material} ref={ref} attach="material" />
    }
)
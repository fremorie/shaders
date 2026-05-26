import { forwardRef, useEffect, useMemo } from 'react'
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
        }, [vertexShader, fragmentShader, transparent, wireframe, side])

        useEffect(() => {
            Object.assign(material.uniforms, uniforms)
        }, [material, uniforms])

        useEffect(() => {
            return () => material.dispose()
        }, [material])

        return <primitive object={material} ref={ref} attach="material" />
    }
)
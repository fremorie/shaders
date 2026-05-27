import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from '../../shaders/sdfCircle/vertex.glsl'
import fragmentShader from '../../shaders/sdfCircle/fragment.glsl'

export function SDFCircleShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uResolution: new THREE.Uniform(new THREE.Vector2(width, height)),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.x = width
            materialRef.current.uniforms.uResolution.value.y = height
        }
    }, [width, height])

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

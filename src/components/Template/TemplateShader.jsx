import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import { useControls } from 'leva'

import vertexShader from '../../shaders/smoothstep/vertex.glsl'
import fragmentShader from '../../shaders/smoothstep/fragment.glsl'

export function TemplateShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const { uEdge0, uEdge1 } = useControls({
        uEdge0: { value: 0, min: 0, max: 1 },
        uEdge1: { value: 1, min: 0, max: 1 },
    })

    const uniforms = useMemo(
        () => ({
            uEdge0: new THREE.Uniform(0),
            uEdge1: new THREE.Uniform(1),
        }),
        []
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uEdge0.value = uEdge0
            materialRef.current.uniforms.uEdge1.value = uEdge1
        }
    }, [uEdge0, uEdge1])

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

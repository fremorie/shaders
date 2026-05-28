import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export function SpiralShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
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

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

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

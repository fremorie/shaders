import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export function DistanceFieldShader() {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const uniforms = useMemo(
        () => ({
            uMouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
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

    const handlePointerMove = ({ point }) => {
        materialRef.current.uniforms.uMouse.value = new THREE.Vector2(
            point.x,
            point.y
        )
    }

    return (
        <mesh scale={[width, height, 1]} onPointerMove={handlePointerMove}>
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

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { RawShaderMaterial } from '../../utils/RawShaderMaterial'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { useControls, folder } from 'leva'

export function SDFSphereShader({ store }) {
    const { width, height } = useThree((state) => state.viewport)
    const materialRef = useRef(null)

    const controls = useControls(
        {
            'Light position': folder({
                lightX: {
                    value: 10,
                    min: -10,
                    max: 10,
                    step: 0.01,
                    label: 'X',
                },
                lightY: {
                    value: 10,
                    min: -10,
                    max: 10,
                    step: 0.01,
                    label: 'Y',
                },
                lightZ: {
                    value: 10,
                    min: -10,
                    max: 10,
                    step: 0.01,
                    label: 'Z',
                },
            }),
        },
        { store }
    )

    const uniforms = useMemo(
        () => ({
            uTime: new THREE.Uniform(0),
            uResolution: new THREE.Uniform(new THREE.Vector2(width, height)),
            uLightPosition: new THREE.Uniform(
                new THREE.Vector3(
                    controls.lightX,
                    controls.lightY,
                    controls.lightZ
                )
            ),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // intentionally empty: uniform objects are created once; useEffect mutates .value to sync controls
    )

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.x = width
            materialRef.current.uniforms.uResolution.value.y = height

            materialRef.current.uniforms.uLightPosition.value =
                new THREE.Vector3(
                    controls.lightX,
                    controls.lightY,
                    controls.lightZ
                )
        }
    }, [width, height, controls])

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

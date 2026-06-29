import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls, folder } from 'leva'

import { RawShaderMaterial } from '../../utils/RawShaderMaterial'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export function MatricesShader({ store }) {
    const materialRef = useRef(null)

    return (
        <mesh>
            <boxGeometry />
            <RawShaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                wireframe
            />
        </mesh>
    )
}

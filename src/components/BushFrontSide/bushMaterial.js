import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import * as THREE from 'three'

import bushVertexShader from './shaders/bush/vertex.glsl'
import bushFragmentShader from './shaders/bush/fragment.glsl'

export const bushUniforms = {
    uTime: new THREE.Uniform(0),
    uPerlinNoiseTexture: new THREE.Uniform(null),
    uWorldNoiseScale: new THREE.Uniform(0.02),
    uSpeed: new THREE.Uniform(0.05),
}

export const bushDepthMaterial = new CustomShaderMaterial({
    // MeshDepthMaterial props
    depthPacking: THREE.RGBADepthPacking,

    // Shader (CSM props)
    vertexShader: bushVertexShader,
    uniforms: bushUniforms,
    baseMaterial: THREE.MeshDepthMaterial,
})

export const bushMaterial = new CustomShaderMaterial({
    // MeshStandardMaterial props
    metalness: 0,
    roughness: 0.8,
    color: '#597932',
    alphaTest: 0.5,

    // Shader (CSM props)
    vertexShader: bushVertexShader,
    fragmentShader: bushFragmentShader,
    uniforms: bushUniforms,
    baseMaterial: THREE.MeshStandardMaterial,
})

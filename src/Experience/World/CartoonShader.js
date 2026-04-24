import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import fragmentShader from '../../shaders/cartoon/fragment.glsl'
import vertexShader from '../../shaders/cartoon/vertex.glsl'

export default class CartoonShader extends ShaderPlane {
    constructor(geometry, position, lightDirection) {
        super(geometry, position, lightDirection)
        this.setMaterial()
        this.setMesh()
    }

    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uLightDirection: { value: this.lightDirection }
            },
        })
    }

    update() {
        this.mesh.rotation.y += this.experience.time.delta * 0.001
    }
}
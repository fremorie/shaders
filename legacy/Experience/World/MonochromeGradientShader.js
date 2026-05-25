import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import fragmentShader from '../../shaders/monochromeGradient/fragment.glsl'
import vertexShader from '../../shaders/monochromeGradient/vertex.glsl'

export default class MonochromeGradientShader extends ShaderPlane {
    constructor(geometry, position) {
        super(geometry, position)
        this.setMaterial()
        this.setMesh()
    }

    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
        })
    }
}
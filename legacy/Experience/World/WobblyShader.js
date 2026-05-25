import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import testFragmentShader from '../../shaders/test/fragment.glsl'
import testVertexShader from '../../shaders/test/vertex.glsl'


export default class WobblyShader extends ShaderPlane {
    constructor(geometry, position) {
        super(geometry, position)
        this.setMaterial()
        this.setMesh()
    }

    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: {
                    value: 0,
                }
            },
        })
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}
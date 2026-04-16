import * as THREE from 'three'

import Experience from '../Experience'

import testFragmentShader from '../../shaders/pattern/fragment.glsl'
import testVertexShader from '../../shaders/pattern/vertex.glsl'

export default class PatternShader {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    }

    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            side: THREE.DoubleSide,
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {

    }
}
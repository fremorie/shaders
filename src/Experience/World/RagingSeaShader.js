import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import fragmentShader from '../../shaders/ragingSea/fragment.glsl'
import vertexShader from '../../shaders/ragingSea/vertex.glsl'

export default class RagingSeaShader extends ShaderPlane {
    constructor(geometry, position) {
        super(geometry, position)
        this.setMaterial()
        this.setMesh()
        this.rotateMesh()
    }

    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uBigWavesElevation: { value: 0.2 },
                uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
                uTime: { value: 0 },
            }
        })
    }

    rotateMesh() {
        this.mesh.rotation.x = - Math.PI * 0.5
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}
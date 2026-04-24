import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import fragmentShader from '../../shaders/aluminum/fragment.glsl'
import vertexShader from '../../shaders/aluminum/vertex.glsl'

export default class AluminumShader extends ShaderPlane {
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
                uKd: {
                    value: 0.7
                },
                uKs: {
                    value: 0.3
                },
                shininess: {
                    value: 100.0
                },
                uGroove: {
                    value: 1.0,
                },
                uLightDirection:	{ value: this.lightDirection },
                uDirLightColor: { value: new THREE.Color( 0xFFFFFF ) },

                uMaterialColor: { value: new THREE.Color( 0xFFFFFF ) },
                uSpecularColor: { value: new THREE.Color( 0xFFFFFF ) },
            }
        })
    }

    update() {
        // this.mesh.rotation.y += this.experience.time.delta * 0.001
        // this.mesh.rotation.z += this.experience.time.delta * 0.001
        this.mesh.rotation.x = Math.sin(this.experience.time.elapsed) * 0.5
    }
}
import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import fragmentShader from '../../shaders/halftone/fragment.glsl'
import vertexShader from '../../shaders/halftone/vertex.glsl'

export default class HalftoneShader extends ShaderPlane {
    constructor(geometry, position, lightDirection) {
        super(geometry, position, lightDirection)

        this.sizes = this.experience.sizes

        this.materialParameters = {
            color: '#5697a4',
            shadowColor: '#1a1967',
            lightColor: '#f0f1e5',
        }

        this.setMaterial()
        this.setMesh()
    }

    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uLightDirection: { value: this.lightDirection },
                uColor: new THREE.Uniform(new THREE.Color(this.materialParameters.color)),
                uResolution: new THREE.Uniform(new THREE.Vector2(
                    this.sizes.width * this.sizes.pixelRatio,
                    this.sizes.height * this.sizes.pixelRatio,
                )),
                uShadowRepetitions: new THREE.Uniform(100),
                uShadowColor: new THREE.Uniform(new THREE.Color(this.materialParameters.shadowColor)),
                uLightRepetitions: new THREE.Uniform(130),
                uLightColor: new THREE.Uniform(new THREE.Color(this.materialParameters.lightColor)),
            },
        })
    }

    update() {
        this.mesh.rotation.y = Math.PI / 4; //30 * Math.PI / 180
        this.mesh.rotation.x += this.experience.time.delta * 0.0005
    }
}
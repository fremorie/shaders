import * as THREE from 'three'

import ShaderPlane from './ShaderPlane'

import fragmentShader from '../../shaders/ragingSea/fragment.glsl'
import vertexShader from '../../shaders/ragingSea/vertex.glsl'

export default class RagingSeaShader extends ShaderPlane {
    constructor(geometry, position) {
        super(geometry, position)

        // Debug
        this.debug = this.experience.debug
        this.debugObject = {
            depthColor: '#186691',
            surfaceColor: '#9bd8ff',
            uBigWavesSpeed: 0.75,
        }
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Raging sea')
        }

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
                uBigWavesSpeed: { value: 0.75 },

                uTime: { value: 0 },

                uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
                uColorOffset: { value: 0.08 },
                uColorMultiplier: { value: 5 },
            }
        })

        if (this.debug.active) {
            this.debugFolder
                .add(this.material.uniforms.uBigWavesSpeed, 'value')
                .name('uBigWavesSpeed')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.material.uniforms.uColorOffset, 'value')
                .name('uColorOffset')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.material.uniforms.uColorMultiplier, 'value')
                .name('uColorMultiplier')
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .addColor(this.debugObject, 'depthColor')
                .name('depthColor')
                .onChange(() => {
                    this.material.uniforms.uDepthColor.value
                        .set(this.debugObject.depthColor)
                })

            this.debugFolder
                .addColor(this.debugObject, 'surfaceColor')
                .name('surfaceColor')
                .onChange(() => {
                    this.material.uniforms.uSurfaceColor.value
                        .set(this.debugObject.surfaceColor)
                })
        }
    }

    rotateMesh() {
        this.mesh.rotation.x = - Math.PI * 0.5
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}
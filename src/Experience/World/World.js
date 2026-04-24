import * as THREE from 'three'

import Experience from '../Experience'
import Environment from './Environment'

import GradientShader from './GradientShader'
import WobblyShader from './WobblyShader'
import RagingSeaShader from './RagingSeaShader'
import MonochromeGradientShader from './MonochromeGradientShader'
import NoiseShader from './NoiseShader'
import MonochromeSpotShader from './MonochromeSpotShader'
import CartoonShader from './CartoonShader'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.geometrySize = 2;

        // Setup
        this.environment = new Environment()
        this.cubeGeometry = new THREE.BoxGeometry(
            this.geometrySize,
            this.geometrySize,
            this.geometrySize,
            32,
            32,
            32
        );
        this.sphereGeometry = new THREE.SphereGeometry(
            this.geometrySize / 2,
        );
        this.torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.3, 128, 16)

        this.shaders = [
            [
                {shader: WobblyShader},
                {shader: RagingSeaShader},
                {shader: MonochromeGradientShader},
                {shader: GradientShader},
            ],
            [
                {shader: NoiseShader},
                {shader: MonochromeSpotShader},
                {shader: CartoonShader, geometry: this.torusKnotGeometry},
            ],
        ]

        this.shaderInstances = []
        this.shaderPositions = []

        this.renderShaders()
        this.updateControlsTarget()
    }

    renderShaders() {
        const gap = 1.2

        for (let j = 0; j < this.shaders.length; j++) {
            for (let i = 0; i < this.shaders[j].length; i++) {

                const position = [
                    i * (this.geometrySize + gap),
                    j * (this.geometrySize + gap),
                    0
                ];

                this.shaderPositions.push(position)

                const ShaderClass = this.shaders[j][i].shader;
                const geometry = this.shaders[j][i].geometry ?? this.cubeGeometry;

                this.shaderInstances.push(
                    new ShaderClass(
                        geometry,
                        position,
                        this.environment.lightDirection,
                    )
                )
            }
        }
    }

    updateControlsTarget() {
        const maxX = Math.max(...this.shaderPositions.map(position => position[0]))
        const maxY = Math.max(...this.shaderPositions.map(position => position[1]))

        this.experience.camera.controls.target.set(maxX / 2, maxY / 2, 0)
    }

    update() {
        this.environment.update()

        for (const shader of this.shaderInstances) {
            if (!!shader.update) {
                shader.update()
            }
        }
    }
}
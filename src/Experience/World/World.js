import * as THREE from 'three'

import Experience from '../Experience'
import Environment from './Environment'

import GradientShader from './GradientShader'
import WobblyShader from './WobblyShader'
import RagingSeaShader from './RagingSeaShader'
import MonochromeGradientShader from './MonochromeGradientShader'
import NoiseShader from './NoiseShader'
import MonochromeSpotShader from './MonochromeSpotShader'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.environment = new Environment()
        this.planeGeometry = new THREE.PlaneGeometry(2, 2, 32, 32)

        // Shaders
        this.wobblyShader = new WobblyShader(
            this.planeGeometry,
            [-3.2, 0, 0],
        )

        this.ragingSea = new RagingSeaShader(
            this.planeGeometry,
            [0, 0, 0],
        )

        this.monochromeGradientShader = new MonochromeGradientShader(
            this.planeGeometry,
            [3.2, 0, 0],
        )

        this.gradientShader = new GradientShader(
            this.planeGeometry,
            [6.4, 0, 0],
        )
        this.noiseShader = new NoiseShader(
            this.planeGeometry,
            [-3.2, -3.2, 0],
        )
        this.monochromeSpotShader = new MonochromeSpotShader(
            this.planeGeometry,
            [0, -3.2, 0]
        )
    }

    update() {
        if(this.wobblyShader)
            this.wobblyShader.update()

        if (this.ragingSea)
            this.ragingSea.update()
    }
}
import Experience from '../Experience'
import Environment from './Environment'
import PatternShader from './PatternShader'
import GradientShader from './GradientShader'
import * as THREE from 'three'
import WobblyShader from './WobblyShader'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.environment = new Environment()
        this.planeGeometry = new THREE.PlaneGeometry(1, 1, 32, 32)

        // Shaders
        this.wobblyShader = new WobblyShader(
            this.planeGeometry,
            [-1.2, 0, 0],
        )
        this.patternShader = new PatternShader(
            this.planeGeometry,
            [0, 0, 0],
        )
        this.gradientShader = new GradientShader(
            this.planeGeometry,
            [1.2, 0, 0],
        )
    }

    update() {
        if(this.wobblyShader)
            this.wobblyShader.update()
    }
}
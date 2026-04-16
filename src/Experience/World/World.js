import Experience from '../Experience'
import Environment from './Environment'
import ShaderPlane from './ShaderPlane'
import PatternShader from './PatternShader'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.shaderPlane = new ShaderPlane()
        this.patternShader = new PatternShader()
        this.environment = new Environment()
    }

    update() {
        if(this.shaderPlane)
            this.shaderPlane.update()
    }
}
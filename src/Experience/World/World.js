import Experience from '../Experience'
import Environment from './Environment'
import ShaderPlane from './ShaderPlane.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.shaderPlane = new ShaderPlane()
        this.environment = new Environment()
    }
}
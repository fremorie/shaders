import Experience from '../Experience'
import * as THREE from 'three'

export default class ShaderPlane {
    constructor(geometry, position) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.geometry = geometry
        this.position = position
        this.material = null
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(...this.position)

        this.scene.add(this.mesh)
    }

    update() {}
}
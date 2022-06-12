import * as THREE from 'three'
import Experience from '../Experience.js'

export default class FlowField
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene

        this.setEnvironment()
    }

    setEnvironment()
    {
        this.environment = {}
        this.environment.camera = new THREE.OrthographicCamera(-1, 1, 1, -1)
    }
}
import Particles from './Particles.js'

export default class Ring {
    constructor () {
        this.setParticles()
    }

    setParticles() {
        this.particles = new Particles()
    }

    update() {
        this.particles.update()
    }
}

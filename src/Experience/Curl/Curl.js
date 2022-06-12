import * as THREE from 'three'
import Experience from '../Experience.js'
import Particles from './Particles.js'

export default class Curl
{
    constructor()
    {
        this.setParticles()
    }

    setParticles()
    {
        this.particles = new Particles()
    }

    update()
    {
        this.particles.update()
    }
}

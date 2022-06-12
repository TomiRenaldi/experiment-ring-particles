import * as THREE from 'three'
import Experience from './Experience.js'
import Curl from './Curl/Curl.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setCurl()
            }
        })
    }

    setCurl()
    {
        this.curl = new Curl()        
    }

    resize()
    {
    }

    update()
    {
        if(this.curl)
            this.curl.update()
    }

    destroy()
    {
    }
}
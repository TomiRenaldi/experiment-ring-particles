import * as THREE from 'three'

import Experience from '../Experience.js'
import FlowField from './FlowField.js'

import vertexShader from '../shaders/particles/vertex.glsl'
import fragmentShader from '../shaders/particles/fragment.glsl'

export default class Particles {
    constructor () {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.resources = this.experience.resources

        this.count = 1000

        if (this.debug) {
            this.debugFolder = this.debug.addFolder({
                title: 'particles'
            })
        }

        this.setPositions()
        this.setFlowfield()
        this.setGeometry()
        this.setColor()
        this.setMaterial()
        this.setPoints()
    }

    setPositions() {
        this.positions = new Float32Array(this.count * 3)

        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * Math.PI * 2
            this.positions[i * 3 + 0] = Math.sin(angle)
            this.positions[i * 3 + 1] = Math.cos(angle)
            this.positions[i * 3 + 2] = 0
        }
    }

    setFlowfield() {
        this.flowField = new FlowField(this.positions)
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('aFboUv', this.flowField.fboUv.attribute)
    }

    setColor() {
        this.color = {}

        this.color.value = '#191919'
        this.color.instance = new THREE.Color(this.color.value)
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uColor: { value: this.color.instance },
                uSize: { value: 70 },
                uMaskTexture: { value: this.resources.items.particleMaskTexture },
                uFBOTexture: { value: this.flowField.texture }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        if (this.debug) {
            this.debugFolder
                .addInput(
                    this.color,
                    'value',
                    { view: 'color' }
                )
                .on('change', () => {
                    this.color.instance.set(this.color.value)
                })

            this.debugFolder
                .addInput(
                    this.material.uniforms.uSize,
                    'value',
                    { label: 'uSize', min: 1, max: 100, step: 1 }
                )
                .on('change', () => {
                    this.color.instance.set(this.color.value)
                })
        }
    }

    setPoints() {
        this.points = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
    }

    update() {
        this.flowField.update()
        this.material.uniforms.uFBOTexture.value = this.flowField.texture
    }
}
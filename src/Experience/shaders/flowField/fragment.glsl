uniform float uTime;
uniform sampler2D uBaseTexture;
uniform sampler2D uTexture;

uniform float uPerlinFrequency;

varying vec2 vUv;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

void main()
{
    vec4 color = texture2D(uTexture, vUv);
    color.a -= 0.005;

    if(color.a <= 0.0)
    {
        color = texture2D(uBaseTexture, vUv);
    }
    else
    {
        vec4 baseColor = color;

        float time = uTime * 0.001;

        color.r += perlin3d(vec3(baseColor.gb * uPerlinFrequency           , time)) * 0.01;
        color.g += perlin3d(vec3(baseColor.rb * uPerlinFrequency + 123.45  , time)) * 0.01;
        color.b += perlin3d(vec3(baseColor.rg * uPerlinFrequency + 12345.67, time)) * 0.01;
    }

    gl_FragColor = color;
}
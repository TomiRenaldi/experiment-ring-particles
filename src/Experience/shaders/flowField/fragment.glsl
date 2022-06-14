uniform float uTime;
uniform sampler2D uBaseTexture;
uniform sampler2D uTexture;

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

        float time = uTime * 0.000001;

        color.r += perlin3d(vec3(baseColor.gb * 0.005, time)) + 0.0001;
        color.g += perlin3d(vec3(baseColor.rb * 0.005 + 123.0, time)) + 0.0001;
        color.b += perlin3d(vec3(baseColor.rg * 0.005 + 123456.0, time)) + 0.0001;
    }

    gl_FragColor = color;
}
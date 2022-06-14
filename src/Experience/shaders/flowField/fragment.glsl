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
        // color.rgb = texture2D(uBaseTexture, vUv).rgb;
        // color.a = 1.0;
        color = texture2D(uBaseTexture, vUv);
    }
    else
    {
        vec4 baseColor = color;
        color.r += perlin3d(vec3(baseColor.gb, 0.0)) + 0.001;
        color.g += 0.002;
        color.b += 0.003;
    }

    gl_FragColor = color;
}
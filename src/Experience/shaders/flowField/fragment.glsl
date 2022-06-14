uniform sampler2D uBaseTexture;
uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 baseColor = texture2D(uBaseTexture, vUv);
    gl_FragColor = baseColor;
}
uniform sampler2D uBaseTexture;
uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(uTexture, vUv);
    color.a -= 0.001;

    if(color.a <= 0.0)
    {
        color = texture2D(uBaseTexture, vUv);
    }
    gl_FragColor = color;
}
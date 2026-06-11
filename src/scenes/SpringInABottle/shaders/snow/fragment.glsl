uniform float uTime;

uniform sampler2D uPerlinNoise;
uniform sampler2D uBakedTexture;

varying vec2 vUv;

void main() {
    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    // Noise
    float noise = texture2D(uPerlinNoise, vUv).r;

    // Baked texture
    vec4 bakedTexture = texture2D(uBakedTexture, vUv);

    gl_FragColor = bakedTexture;

    #include <colorspace_fragment>
}
uniform float uTime;
uniform sampler2D uPerlinNoise;
uniform sampler2D uShapeTexture;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    // Place (0, 0) at the center
    vec2 uv = (vUv - 0.5) * 2.0;

    // Final color
    vec3 finalColor = vec3(0.0, 0.0, 0.0);

    // Petal texture (place at the center of the scene)
    float petalMask = texture2D(uShapeTexture, uv + 0.5).r;

    // Noise
    float noise = texture2D(uPerlinNoise, vUv).r;

    float rippleMixStrength = length(uv);

    float ripple = mod((rippleMixStrength - uTime * 0.1) * 10.0, 1.0);
    ripple = ripple - (1.0 - rippleMixStrength);
    ripple += noise;

    if (length(uv) > 0.5) {
        discard;
    }

    finalColor += ripple;

    if (finalColor.r < 0.75) {
        discard;
    }

    gl_FragColor = vec4(finalColor, 1.0);

    #include <colorspace_fragment>
}
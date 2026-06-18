uniform float uTime;
uniform sampler2D uPerlinNoise;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    // Final color
    vec3 finalColor = vec3(0.0, 0.0, 0.0);

    // Noise
    float noise = texture2D(uPerlinNoise, vUv).r;

    // Place (0, 0) at the center
    vec2 uv = (vUv - 0.5) * 2.0;

    float rippleMixStrength = length(uv);

    float ripple = mod((rippleMixStrength - uTime * 0.25) * 5.0, 1.0);
    ripple = ripple - (1.0 - rippleMixStrength);
    ripple += noise;
//    ripple = (
//        ripple > 0.7 &&
//        depthMap > 0.3
//    ) ? ripple : 0.0;

    if (length(uv) > 0.5) {
        discard;
    }

    finalColor += ripple;

    if (finalColor.r < 0.5) {
        discard;
    }

    gl_FragColor = vec4(finalColor, 1.0);

    #include <colorspace_fragment>
}
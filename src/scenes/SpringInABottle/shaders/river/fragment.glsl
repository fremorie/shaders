uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform sampler2D uPerlinNoise;
uniform sampler2D uDepthMap;

varying vec2 vUv;

void main() {
    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    // Noise
    float noise = texture2D(uPerlinNoise, vUv).r;

    // Water color based on depth
    float depthMap = texture2D(uDepthMap, vUv).r;
    finalColor = mix(uDepthColor, uEdgeColor, pow(depthMap, 1.5));

    // Ripple
    float rippleMixStrength = depthMap;
    float ripple = mod((rippleMixStrength - uTime * 0.02) * 30.0, 1.0);
    ripple = ripple - (1.0 - depthMap);
    ripple += noise;
    ripple = (
        ripple > 0.7 &&
        depthMap > 0.3
    ) ? ripple : 0.0;

    finalColor += ripple;

    gl_FragColor = vec4(vec3(finalColor), 1.0);

    #include <colorspace_fragment>
}
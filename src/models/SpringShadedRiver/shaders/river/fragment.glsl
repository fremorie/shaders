uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform sampler2D uPerlinNoise;

uniform sampler2D uDepthMapSmooth;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    // Noise
    float noise = texture2D(uPerlinNoise, vUv).r;

    // Water color based on depth
    float depthSmooth = texture2D(uDepthMapSmooth, vUv).r;
    finalColor = mix(uDepthColor, uEdgeColor, pow(depthSmooth, 1.5));

    // Ripple
    float rippleMixStrength = depthSmooth;
    float ripple = mod((rippleMixStrength - uTime * 0.05) * 20.0, 1.0);
    ripple = ripple - (1.0 - depthSmooth);
    ripple += noise;
    bool isRight = vUv.y > 0.3 || vUv.x > 0.3;
    ripple = (
        ripple > 0.8 &&
        depthSmooth > 0.01
//        vUv.y < 0.7 &&
//        isRight
    ) ? ripple : 0.0;

    finalColor += ripple;

    gl_FragColor = vec4(vec3(finalColor), 1.0);

    #include <colorspace_fragment>
}
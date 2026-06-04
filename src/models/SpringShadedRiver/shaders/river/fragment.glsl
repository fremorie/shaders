uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform float uPhaseA;
uniform float uFrequencyA;
uniform float uPhaseB;
uniform float uFrequencyB;
uniform float uPhaseC;
uniform float uFrequencyC;
uniform float uPhaseD;
uniform float uFrequencyD;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    float riverLeftCenter =
        0.5 +
        0.2 * sin(vUv.x * uFrequencyA + uPhaseA) +
        0.5 * sin(vUv.x * uFrequencyB + uPhaseB);

    float riverRightCenter =
        0.5 +
        0.2 * sin(vUv.x * uFrequencyC + uPhaseC) +
        0.5 * sin(vUv.x * uFrequencyD + uPhaseD);

    float offsetStrength = smoothstep(0.4, 0.6, vUv.x);

    // Use riverLeftCenter on the left side and riverRightCenter on the right.
    float centerOffset = offsetStrength * riverLeftCenter + (1.0 - offsetStrength) * riverRightCenter;

    float center = 0.5 + centerOffset;

    // Depth gradient (X)
    float distFromCenter = abs(vUv.y - center);
    float mixStrength = smoothstep(0.0, 0.7, distFromCenter);

    float ripple = mod(mixStrength - uTime * 0.05, 0.1);
    ripple = ripple > 0.08 ? ripple : 0.0;
    ripple = distFromCenter > 0.15 ? ripple : 0.0;

    vec3 color = mix(uDepthColor, uEdgeColor, mixStrength);


    gl_FragColor = vec4(color + ripple, 1.0);

    #include <colorspace_fragment>
}
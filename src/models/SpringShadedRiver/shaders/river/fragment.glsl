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
        0.2 * sin(vUv.y * uFrequencyA + uPhaseA) +
        0.5 * sin(vUv.y * uFrequencyB + uPhaseB);

    float riverRightCenter =
        0.5 +
        0.2 * sin(vUv.y * uFrequencyC + uPhaseC) +
        0.5 * sin(vUv.y * uFrequencyD + uPhaseD);

    float offsetStrength = smoothstep(0.4, 0.6, vUv.y);

    // Use riverLeftCenter on the left side and riverRightCenter on the right.
    float centerOffset = offsetStrength * riverLeftCenter + (1.0 - offsetStrength) * riverRightCenter;

    float center = 0.5 + centerOffset;

    // Depth gradient (X)
    float distFromCenter = abs(vUv.x - center);
    float mixStrength = smoothstep(0.0, 0.7, distFromCenter);
    vec3 color = mix(uDepthColor, uEdgeColor, mixStrength);


    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}
uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    float distFromCenter = abs(vUv.x - 0.5);
    float mixStrength = smoothstep(0.0, 0.7, distFromCenter);

    vec3 color = mix(uDepthColor, uEdgeColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}
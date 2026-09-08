precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

#define PI 3.1415926535

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    // Prevent from deformation on window resize
    uv.x *= uResolution.x / uResolution.y;

    vec3 color = vec3(1.0, 0.0, 0.0);

    gl_FragColor = vec4(color, 1.0);
}
precision mediump float;

uniform float uScale;
uniform float uHaloThreshold;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    uv.x *= uResolution.x / uResolution.y;

    float strength = length(uv);
    strength = uScale / strength - uHaloThreshold;

    vec4 color = vec4(vec3(strength), 1.0);

    gl_FragColor = color;
}
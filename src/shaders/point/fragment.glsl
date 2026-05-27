precision mediump float;

uniform float uScale;
uniform float uHaloThreshold;

varying vec2 vUv;

void main() {
    float strength = length(vec2(0.5) - vUv);
    strength = uScale / strength - uHaloThreshold;

    vec4 color = vec4(vec3(strength), 1.0);

    gl_FragColor = color;
}
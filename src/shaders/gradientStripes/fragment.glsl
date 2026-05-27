precision mediump float;

uniform float uRepeatCount;

varying vec2 vUv;

void main() {
    float strength = floor(vUv.x * uRepeatCount) / uRepeatCount;
    vec4 color = vec4(vec3(strength), 1.0);

    gl_FragColor = color;
}
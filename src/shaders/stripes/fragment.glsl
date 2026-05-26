precision mediump float;

uniform float uRepeatCount;
uniform float uModulo;

varying vec2 vUv;

void main() {
    float strength = mod(vUv.y * uRepeatCount, uModulo);
    vec4 color = vec4(vec3(strength), 1.0);

    gl_FragColor = color;
}
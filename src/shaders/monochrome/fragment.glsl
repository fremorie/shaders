precision mediump float;

varying vec2 vUv;

void main() {
    float strength = 1.0 - vUv.y;

    vec4 color = vec4(strength, strength, strength, 1.0);

    gl_FragColor = color;
}
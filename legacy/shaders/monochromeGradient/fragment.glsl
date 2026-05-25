precision mediump float;

varying vec2 vUv;

void main() {
    float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    vec4 color = vec4(strength, strength, strength, 1.0);

    gl_FragColor = color;
}
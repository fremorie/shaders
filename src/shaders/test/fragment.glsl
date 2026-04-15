precision mediump float;

uniform mediump float uTime;

varying float vElevation;

void main() {
    vec4 color = vec4(vElevation, 0.0, 0.2, 1.0);

    gl_FragColor = color;
}
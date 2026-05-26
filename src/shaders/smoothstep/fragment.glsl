precision mediump float;

uniform float uEdge0;
uniform float uEdge1;

varying vec2 vUv;

void main() {
    float strength = smoothstep(uEdge0, uEdge1, vUv.x);
    vec4 color = vec4(vec3(strength), 1.0);

    gl_FragColor = color;
}
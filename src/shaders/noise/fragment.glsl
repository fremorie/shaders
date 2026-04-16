precision mediump float;

varying vec2 vUv;

// https://thebookofshaders.com/10/
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.545123);
}

void main() {
    float strength = random(vUv);

    vec4 color = vec4(strength, strength, strength, 1.0);

    gl_FragColor = color;
}
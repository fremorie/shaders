uniform float uTime;

varying vec2 vUv;

void main() {
    // Final color
    vec3 finalColor = vec3(0.5, 0.5, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);

    #include <colorspace_fragment>
}
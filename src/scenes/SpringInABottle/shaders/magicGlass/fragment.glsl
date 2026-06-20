uniform float uTime;

varying vec2 vUv;

void main() {
    // Final color
    vec3 finalColor = vec3(0.5, 0.5, 1.0);

    // Move the center to (0.5, 0.5),
    // then change range from [-0.5, 0.5] to [-1, 1]
    vec2 uv = (vUv - 0.5) * 2.0;

    float distanceToCenter = length(uv);
    float alpha = smoothstep(0.7, 1.0, distanceToCenter);

    gl_FragColor = vec4(finalColor, alpha);

    #include <colorspace_fragment>
}
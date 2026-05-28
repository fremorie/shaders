precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

float sdfCircle( vec2 position, float radius ) {
    return length(position) - radius;
}

#define PI 3.1415926535

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    // Prevent from deformation on window resize
    uv.x *= uResolution.x / uResolution.y;

    vec3 finalColor = vec3(1.0, 1.0, 2.0);

    // Create a circle
    float strength = sdfCircle(uv, 0.5);

    // Create a spiral
    float angle = atan(uv.y, uv.x);
    strength = sin(strength * 16.0 - uTime * 2.0 + angle) / 2.0 + 0.5;

    vec4 color = vec4(
        finalColor * strength,
        1.0
    );

    gl_FragColor = color;
}
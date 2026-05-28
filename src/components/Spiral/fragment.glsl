precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uBias;
uniform vec3 uAmplitude;
uniform vec3 uFrequency;
uniform vec3 uPhase;
uniform float uSpeed;

varying vec2 vUv;

#define PI 3.1415926535

float sdfCircle( vec2 position, float radius ) {
    return length(position) - radius;
}

vec3 cosinePalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI * (c * t + d));
}

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    // Prevent from deformation on window resize
    uv.x *= uResolution.x / uResolution.y;

    // Create a circle
    float strength = sdfCircle(uv, 0.5);

    vec3 finalColor = cosinePalette(
        uTime * 0.2 + strength,
        uBias,
        uAmplitude,
        uFrequency,
        uPhase
    );

    // Create a spiral
    float angle = atan(uv.y, uv.x);
    strength = sin(strength * 16.0 - uTime * uSpeed + angle) / 2.0 + 0.5;

    vec4 color = vec4(
        finalColor * strength,
        1.0
    );

    gl_FragColor = color;
}
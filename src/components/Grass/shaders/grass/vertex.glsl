uniform float uTime;

attribute float aPhaseOffset;

varying vec2 vUv;

const float WIND_STRENGTH = 0.02;

void main() {
    float windMultiplier = smoothstep(0.0, 1.0, uv.y);
    float wind = sin(uTime + aPhaseOffset) * windMultiplier;

    vec3 localPosition = position;
    localPosition.x += wind * WIND_STRENGTH;

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(localPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}
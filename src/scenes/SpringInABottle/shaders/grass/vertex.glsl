uniform float uTime;

attribute float aPhaseOffset;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);

    float windMultiplier = uv.y;
    float wind = sin(uTime + aPhaseOffset) * windMultiplier;
    modelPosition.x += wind * 0.02;
    modelPosition.z += wind * 0.02 + 0.01;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}
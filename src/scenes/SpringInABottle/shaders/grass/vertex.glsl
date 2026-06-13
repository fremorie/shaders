uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Wind animation
    vec4 newPosition = modelPosition;

    // The lower part of the grass blade should stay the same (y ~= 0)
    float windMultiplier = uv.y;

    float wind = sin(uTime) * windMultiplier;
    newPosition.x += wind * 0.001;
    newPosition.z += wind * 0.03;

    // Finish calculations
    vec4 viewPosition = viewMatrix * newPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    // Final position
    gl_Position = projectionPosition;

    // Varyings
    vUv = uv;
}
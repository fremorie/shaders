uniform float uTime;

attribute float aPhaseOffset;

varying vec2 vUv;

const float WIND_STRENGTH = 0.02;

void main() {
    float windMultiplier = smoothstep(0.0, 1.0, uv.y);
    float wind = sin(uTime + aPhaseOffset) * windMultiplier;

    vec3 localPosition = position;
    localPosition.x += wind * WIND_STRENGTH;

    // Always face the camera
    vec3 instanceWorldOrigin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vec3 toCamera = cameraPosition - instanceWorldOrigin;
    float facingAngle = atan(toCamera.x, toCamera.z);
    float sinAngle = sin(facingAngle);
    float cosAngle = cos(facingAngle);
    localPosition = vec3(
        localPosition.x * cosAngle + localPosition.z * sinAngle,
        localPosition.y,
        -localPosition.x * sinAngle + localPosition.z * cosAngle
    );

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(localPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}
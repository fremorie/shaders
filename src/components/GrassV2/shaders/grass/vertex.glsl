uniform float uTime;

attribute float aBladeRandom;

varying vec2 vUv;

#include "../includes/perlinNoise.glsl"

const vec2 WIND_DIRECTION = vec2(0.8575, 0.5145);
const float WIND_SPEED = 0.15;
const float WIND_FREQUENCY = 0.4;
const float WIND_STRENGTH = 0.04;

void main() {
    vec3 instanceWorldOrigin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vec2 windSamplePosition =
        instanceWorldOrigin.xz * WIND_FREQUENCY - WIND_DIRECTION * uTime * WIND_SPEED;

    // Wind gusts
    float gust = cnoise(vec3(windSamplePosition, 0.0));
    float flutter = cnoise(
        vec3(windSamplePosition * 3.0 + aBladeRandom * 10.0, uTime * 0.6 + aBladeRandom)
    );

    // Each blade bends a little more or less than its neighbours
    float bladeStrength = 0.7 + aBladeRandom * 0.6;
    float windAmount = (gust + flutter * 0.3) * bladeStrength;

    float windMultiplier = smoothstep(0.0, 1.0, uv.y);

    vec3 localPosition = position;
    localPosition.x += windAmount * windMultiplier * WIND_STRENGTH;

    // Always face the camera
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

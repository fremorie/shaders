uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uBigWavesSpeed;

attribute vec3 position;
attribute vec2 uv;

varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1);

    // Elevation
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                      sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;
    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Varyings
    vElevation = elevation;
}
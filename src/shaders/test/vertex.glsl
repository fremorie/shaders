uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1);
    float elevation = sin(modelPosition.x * 11.0) * 0.1;
    elevation *= sin(modelPosition.y * 13.0);
    elevation *= sin(modelPosition.z * 15.0);

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
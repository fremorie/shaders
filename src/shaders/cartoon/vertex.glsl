uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;

attribute vec3 position;
attribute vec3 normal;

// Custom variables
uniform vec3 uLightDirection;

varying vec3 vNormal;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Varyings
    vNormal = normalize(normalMatrix * normal);
}
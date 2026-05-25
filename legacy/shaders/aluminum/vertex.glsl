uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

attribute vec3 position;
attribute vec3 normal;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    // Varyings
    vNormal = normalize( normalMatrix * normal );
    vViewPosition = -mvPosition.xyz;
    vWorldPosition = position;

}
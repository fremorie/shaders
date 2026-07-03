uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 uModelMatrix;

attribute vec3 position;

void main() {
    gl_Position = projectionMatrix * viewMatrix * uModelMatrix * vec4(position, 1);
}
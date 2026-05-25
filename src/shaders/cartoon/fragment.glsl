precision mediump float;

uniform vec3 uLightDirection;

varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightDirection);

    float diffuse = max(
        dot(normal, lightDir),
        0.0
    );

    vec3 steps = vec3(0.25, 0.5, 0.75);

    if (diffuse >= steps.z) {
        diffuse = 0.7;
    }

    else if (diffuse >= steps.y) {
        diffuse = 0.6;
    }

    else if (diffuse >= steps.x) {
        diffuse = 0.4;
    }

    else if (diffuse < steps.x) {
        diffuse = 0.15;
    }

    vec4 color = vec4(0.5, 0.0, 0.5, 1.0) * diffuse;

    gl_FragColor = color;
}
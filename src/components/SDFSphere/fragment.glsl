precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uLightPosition;

varying vec2 vUv;

#define PI 3.1415926535
#define MAX_STEPS 100
#define MAX_DIST 100.0
#define SURFACE_DIST 0.01

float sdfSphere(vec3 position, float radius) {
    return length(position) - radius;
}

float scene(vec3 position) {
    float distance = sdfSphere(position, 2.0);

    return distance;
}

float raymarch(vec3 rayOrigin, vec3 rayDirection) {
    float dO = 0.0;
    vec3 color = vec3(0.0);

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = rayOrigin + rayDirection * dO;

        float dS = scene(p);
        dO += dS;

        if (dO > MAX_DIST || dS < SURFACE_DIST) {
            break;
        }
    }
    return dO;
}

vec3 getNormal(vec3 position) {
    vec2 e = vec2(.01, 0);

    vec3 n = scene(position) - vec3(
        scene(position - e.xyy),
        scene(position - e.yxy),
        scene(position - e.yyx)
    );

    return normalize(n);
}

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    // Prevent from deformation on window resize
    uv.x *= uResolution.x / uResolution.y;

    // Ray origin: camera
    vec3 rayOrigin = vec3(0.0, 0.0, 5.0);

    // Beam rays in every direction on the screen along the negative z-axis
    vec3 rayDirection = normalize(vec3(uv, -1.0));

    // Raymarching
    float d = raymarch(rayOrigin, rayDirection);
    vec3 p = rayOrigin + rayDirection * d;

    vec3 color = vec3(0.0);

    if (d < MAX_DIST) {
        vec3 normal = getNormal(p);
        vec3 lightDirection = normalize(uLightPosition - p);

        float diffuse = max(dot(normal, lightDirection), 0.0);
        color = vec3(1.0, 1.0, 1.0) * diffuse;
    }

    gl_FragColor = vec4(color, 1.0);
}
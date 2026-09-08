precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

#define PI 3.1415926535

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash(float n) {
    return fract(sin(n)*43758.5453);
}

float noise(in vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = i.x + i.y*57.0;

    return mix(mix( hash(n+ 0.0), hash(n+ 1.0),f.x),
               mix( hash(n+57.0), hash(n+58.0),f.x),f.y);
}

float fbm (vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= m * 2.02;
    f += 0.2500 * noise(p); p *= m * 2.03;
    f += 0.1250 * noise(p); p *= m * 2.01;
    f += 0.0625 * noise(p); p *= m * 2.04;
    f /= 0.9375;

    return f;
}

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    // Prevent from deformation on window resize
    uv.x *= uResolution.x / uResolution.y;

    vec3 background = vec3(1.0);
    vec3 color = vec3(1.0);

    float r = sqrt(dot(uv, uv));
    float a = atan(uv.y, uv.x);

    if (r < 0.8) {
        color = vec3(0.2, 0.3, 0.4);
        float f = fbm(5.0 * uv);
        color = mix(color, vec3(0.2, 0.5, 0.4), f);

        f = 1.0 - smoothstep(0.2, 0.5, r);
        color = mix(color, vec3(0.9, 0.6, 0.2), f);

        f = smoothstep(0.2, 0.25, r);
        color *= f;
    }

    gl_FragColor = vec4(color * background, 1.0);
}
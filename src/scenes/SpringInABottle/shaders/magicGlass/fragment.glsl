uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

const mat2 myt = mat2(.12121212, .13131313, -.13131313, .12121212);
const vec2 mys = vec2(1e4, 1e6);

vec2 rhash(vec2 uv) {
    uv *= myt;
    uv *= mys;
    return fract(fract(uv / mys) * uv);
}

vec3 hash(vec3 p) {
    return fract(
        sin(vec3(dot(p, vec3(1.0, 57.0, 113.0)), dot(p, vec3(57.0, 113.0, 1.0)),
                 dot(p, vec3(113.0, 1.0, 57.0)))) *
        43758.5453);
}

vec3 voronoi3d(const in vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);

    float id = 0.0;
    vec2 res = vec2(100.0);
    for (int k = -1; k <= 1; k++) {
        for (int j = -1; j <= 1; j++) {
            for (int i = -1; i <= 1; i++) {
                vec3 b = vec3(float(i), float(j), float(k));
                vec3 r = vec3(b) - f + hash(p + b);
                float d = dot(r, r);

                float cond = max(sign(res.x - d), 0.0);
                float nCond = 1.0 - cond;

                float cond2 = nCond * max(sign(res.y - d), 0.0);
                float nCond2 = 1.0 - cond2;

                id = (dot(p + b, vec3(1.0, 57.0, 113.0)) * cond) + (id * nCond);
                res = vec2(d, res.x) * cond + res * nCond;

                res.y = cond2 * d + nCond2 * res.y;
            }
        }
    }

    return vec3(sqrt(res), abs(id));
}

void main() {
    // Move the center to (0.5, 0.5),
    // then change range from [-0.5, 0.5] to [-1, 1]
    vec2 uv = (vUv - 0.5) * 2.0;

    // Displace the UV
    vec2 displacedUv = vUv + voronoi3d(vec3(vUv * 15.0, uTime * 0.1)).xy;

    // Perlin noise
    float strength = voronoi3d(vec3(displacedUv * 5.0, uTime * 0.2)).x;

    // Outer glow
    float outerGlow = distance(vUv, vec2(0.5)) * 5.0 - 3.2;
    strength += outerGlow;
    strength += step(- 0.2, strength) * 0.8;

    // Final color
    vec3 color = mix(uColorStart, uColorEnd, strength);

    // Alpha
    float distanceToCenter = length(uv);
    float alpha = smoothstep(0.9, 1.0, distanceToCenter);
    alpha = smoothstep(0.98, 1.0, color.b);
    alpha = 1.0 - alpha;

    gl_FragColor = vec4(color, alpha);

    #include <colorspace_fragment>
}
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

#include "../includes/voronoi3d.glsl"

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
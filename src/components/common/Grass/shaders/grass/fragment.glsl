uniform float uTime;
uniform sampler2D uAlphaMap;
uniform vec3 uCenterColor;

varying vec2 vUv;

void main() {
    float alpha = texture2D(uAlphaMap, vUv).r;

    if (alpha < 0.9) {
        discard;
    }

    vec3 baseColor = uCenterColor;

    // Make sides darker
    vec3 color = vec3(vUv.y, vUv.y, 0.0);
    color = mix(baseColor, color, 0.5);

    // Final color
    gl_FragColor = vec4(color, alpha);
}
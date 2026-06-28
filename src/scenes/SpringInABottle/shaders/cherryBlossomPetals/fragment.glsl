uniform sampler2D uTexture;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;

varying float vRotation;
varying float vTumble;
varying vec4 vPosition;

vec2 rotate(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);

    uv -= 0.5;
    uv = mat2(c, -s, s, c) * uv;
    uv += 0.5;

    return uv;
}

void main() {
    vec2 uv = gl_PointCoord;

    // Squash horizontally as the petal tumbles so it reads as turning edge-on
    float squash = max(abs(vTumble), 0.25);
    uv.x = (uv.x - 0.5) / squash + 0.5;

    uv = rotate(uv, vRotation);

    // Drop anything pushed outside the sprite by the squash/rotation
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        discard;
    }

    float mask = texture2D(uTexture, uv).r;
    float alpha = smoothstep(0.2, 0.6, mask);

    if (alpha < 0.1) {
        discard;
    }

    vec3 finalColor = mix(uLightColor, uDarkColor, uv.y);

    gl_FragColor = vec4(finalColor, alpha);

    #include <colorspace_fragment>
}

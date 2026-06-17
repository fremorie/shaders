uniform sampler2D uTexture;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;

varying float vRotation;
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
    uv = rotate(uv, vRotation);

    vec4 color = texture2D(uTexture, uv);

    if (color.r < 0.5) {
        discard;
    }

    vec3 finalColor = mix(uLightColor, uDarkColor, uv.y);

    gl_FragColor = vec4(finalColor, 1.0);
}
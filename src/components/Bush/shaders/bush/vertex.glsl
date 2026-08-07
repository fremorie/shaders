uniform float uTime;
uniform sampler2D uPerlinNoiseTexture;

void main() {
    vec2 worldUV = (modelMatrix * vec4(csm_Position, 1.0)).xz;

    vec2 perlinUV = worldUV * 0.2 + uTime * 0.1;
    vec4 perlinColor = (texture(uPerlinNoiseTexture, perlinUV) - 0.5) * csm_Position.y;

    // Final position
    csm_Position += vec3(perlinColor.r, 0, perlinColor.r);
}
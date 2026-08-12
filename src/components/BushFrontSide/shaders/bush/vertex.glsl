uniform float uTime;
uniform sampler2D uPerlinNoiseTexture;
uniform float uWorldNoiseScale;
uniform float uSpeed;

float csm_noiseTex(vec2 p) {
    return texture2D(uPerlinNoiseTexture, p).r;
}

void main() {
    // Old
    vec2 worldUV = (modelMatrix * vec4(csm_Position, 1.0)).xz;

    vec2 perlinUV = worldUV * uWorldNoiseScale + uTime * uSpeed;
    vec4 perlinColor = (texture(uPerlinNoiseTexture, perlinUV) - 0.5) * csm_Position.y;

    // Final position
    csm_Position += vec3(perlinColor.r, 0, perlinColor.r);

//    float uWiggleSpeed = 0.1;
//    float uWorldNoiseScale = 0.2;
//    float uUvWiggleScale = 0.5;
//    float uNoiseMix = 0.35;
//    float uWiggleStrength  = 0.5;
//
//    vec3 worldPosBase = (modelMatrix * vec4(position, 1.0)).xyz;
//    float t = uTime * uWiggleSpeed;
//
//    float nWorld = csm_noiseTex(worldPosBase.xz * uWorldNoiseScale + vec2(t, t * 0.73));
//    float nUv = csm_noiseTex(uv * uUvWiggleScale + vec2(-t * 0.41, t * 0.29));
//
//    float wWorld = nWorld * 2.0 - 1.0;
//    float wUv = nUv * 2.0 - 1.0;
//    float wiggle = mix(wWorld, wUv, clamp(uNoiseMix, 0.0, 1.0));
//
//    csm_Position = position + normal * wiggle * uWiggleStrength;
}
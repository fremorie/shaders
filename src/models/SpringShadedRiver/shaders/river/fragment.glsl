uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform sampler2D uPerlinNoise;
uniform sampler2D uDepthMap;

uniform vec3 uFresnelColor;
uniform float uFresnelPower;
uniform float uFresnelStrength;

uniform vec3 uFoamColor;
uniform float uFoamMin;
uniform float uFoamMax;
uniform float uFoamNoiseScale;
uniform float uFoamSpeed;
uniform float uFoamFrequency;
uniform float uFoamDistortion;
uniform float uFoamStrength;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main() {
    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    // Water color based on depth
    float depthMap = texture2D(uDepthMap, vUv).r;
    finalColor = mix(uDepthColor, uEdgeColor, pow(depthMap, 1.5));

    // Foam
    float foamNoise = texture2D(uPerlinNoise, vUv * uFoamNoiseScale).r;
    float foamShore = depthMap + (foamNoise - 0.5) * uFoamDistortion;

    // Keep foam near the shore and fade it inward
    float foamBand = smoothstep(uFoamMin, uFoamMax, foamShore);

    float foamWave = fract((foamShore - uTime * uFoamSpeed) * uFoamFrequency);
    float foamCrest = smoothstep(0.0, 0.5, foamWave) * smoothstep(1.0, 0.5, foamWave);

    float foam = foamBand * foamCrest;
    finalColor = mix(finalColor, uFoamColor, foam * uFoamStrength);

    // Fresnel
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(
        1.0 - max(dot(normalize(vWorldNormal), viewDirection), 0.0),
        uFresnelPower
    );
    finalColor = mix(finalColor, uFresnelColor, fresnel * uFresnelStrength);

    gl_FragColor = vec4(vec3(finalColor), 1.0);

    #include <colorspace_fragment>
}
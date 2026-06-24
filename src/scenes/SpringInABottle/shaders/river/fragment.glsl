uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform sampler2D uShadowsTexture;
uniform sampler2D uPerlinNoise;
uniform sampler2D uDepthMap;
uniform sampler2D uBoatField;

uniform vec3 uFresnelColor;
uniform float uFresnelPower;
uniform float uFresnelStrength;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main() {
    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    // Water color based on depth
    float depthMap = texture2D(uDepthMap, vUv).r;
    finalColor = mix(uDepthColor, uEdgeColor, pow(depthMap, 1.5));

    // Ripple
    float ripplePhase = (depthMap - uTime * 0.03) * 10.0;
    float rippleIndex = floor(ripplePhase);
    float noise = texture2D(uPerlinNoise, vUv * 3.0 + rippleIndex * 1.8).r;
    float ripple = mod(ripplePhase, 1.0);
    ripple = ripple - (1.0 - depthMap);
    ripple += noise;
    ripple = (
        ripple > 0.99
    ) ? ripple : 0.0;

    finalColor += ripple;

    // Fresnel
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(
        1.0 - max(dot(normalize(vWorldNormal), viewDirection), 0.0),
        uFresnelPower
    );
    finalColor = mix(finalColor, uFresnelColor, fresnel * uFresnelStrength);

    // Shadows
    vec2 wobble = vec2(
        texture2D(uPerlinNoise, vUv + uTime * 0.02).r,
        texture2D(uPerlinNoise, vUv - uTime * 0.02).r
    ) - 0.5;
    float shadows = texture2D(uShadowsTexture, vUv + wobble * 0.03).r;
    float shadowFactor = smoothstep(0.0, 0.7, shadows);
    finalColor = mix(finalColor * 0.5, finalColor, shadowFactor);

    // Ripples around the boat
    float halo = texture2D(uBoatField, vUv).r;
    float phase = (halo + uTime * 0.02) * 15.0;
    float ringIndex = floor(phase);
    float ringNoise = texture2D(uPerlinNoise, vUv * 4.0 + ringIndex * 1.7).r;
    float boatRipple = mod(phase, 1.0);
    boatRipple = boatRipple - (1.0 - halo);
    boatRipple += ringNoise;
    boatRipple = (
        boatRipple > 0.6 &&
        halo > 0.05
    ) ? boatRipple : 0.0;

    finalColor += boatRipple;

    gl_FragColor = vec4(vec3(finalColor), 1.0);

    #include <colorspace_fragment>
}
uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform sampler2D uDepthMap;

uniform vec3 uFresnelColor;
uniform float uFresnelPower;
uniform float uFresnelStrength;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

void main() {
    vec2 uv = (vUv - 0.5) * 2.0;

    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    // Water color based on depth
    float depthMap = texture2D(uDepthMap, uv).r;
    finalColor = mix(uDepthColor, uEdgeColor, pow(depthMap, 1.5));

    // Fresnel
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(
        1.0 - max(dot(normalize(vWorldNormal), viewDirection), 0.0),
        uFresnelPower
    );
    finalColor = mix(finalColor, uFresnelColor, fresnel * uFresnelStrength);

    gl_FragColor = vec4(vec3(finalColor), 1.0);
    //gl_FragColor = vec4(uv, 0.5, 1.0);

    #include <colorspace_fragment>
}
uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

uniform sampler2D uDepthMap;
uniform sampler2D uDepthMapSmooth;

uniform float uPhaseA;
uniform float uFrequencyA;
uniform float uPhaseB;
uniform float uFrequencyB;
uniform float uPhaseC;
uniform float uFrequencyC;
uniform float uPhaseD;
uniform float uFrequencyD;

varying vec2 vUv;
varying vec3 vPosition;

vec2 rotateUV(vec2 uv, float angle) {
    float s = sin(angle);
    float c = cos(angle);

    // move to center
    uv -= 0.5;

    // rotate
    uv = vec2(
        uv.x * c - uv.y * s,
        uv.x * s + uv.y * c
    );

    // move back
    uv += 0.5;

    return uv;
}

#define PI 3.1415926535

void main() {
    // Position x axis at the center of the river
    vec2 uv = vUv;
//    uv = rotateUV(uv, PI / 8.0);
//    uv.x += 0.15;

    vec2 dx = vec2(1.0e-2, 0.0);
    vec2 dy = vec2(0.0, 1.0e-2);

    float depth = texture2D(uDepthMap, vUv).r;
    float depthSmooth = texture2D(uDepthMapSmooth, vUv).r;

    float dDepthdx = texture2D(uDepthMapSmooth, vUv + dx).r - texture2D(uDepthMapSmooth, vUv - dx).r;
    dDepthdx /= 2.0 * dx.x;
    float dDepthdy = texture2D(uDepthMapSmooth, vUv + dy).r - texture2D(uDepthMapSmooth, vUv - dy).r;
    dDepthdy /= 2.0 * dy.y;

    vec2 grad = vec2(dDepthdx, dDepthdy);
    // float depthSmooth = texture2D(uDepthMapSmooth, vUv).r;

    vec2 direction = vec2(sin(uPhaseA), cos(uPhaseA));
    float prod = (direction.x * uv.x + direction.y * uv.y) / length(uv);
    float wave = sin(20.0 * prod + uTime);

    float riverLeftCenter =
        0.5 +
        0.2 * sin(uv.y * uFrequencyA + uPhaseA) +
        0.5 * sin(uv.y * uFrequencyB + uPhaseB);

    float riverRightCenter =
        0.5 +
        0.2 * sin(uv.y * uFrequencyC + uPhaseC) +
        0.5 * sin(uv.y * uFrequencyD + uPhaseD);

    float offsetStrength = smoothstep(0.4, 0.6, uv.x);

    // Use riverLeftCenter on the left side and riverRightCenter on the right.
    float centerOffset = offsetStrength * riverLeftCenter + (1.0 - offsetStrength) * riverRightCenter;

    float center = depthSmooth; //+ centerOffset;

    // Depth gradient (X)
    float distFromCenter = abs(uv.x - center);
    float mixStrength = smoothstep(0.0, 0.4, distFromCenter);

    float ripple = mod(mixStrength - uTime * 0.05, 0.1);
    ripple = ripple > 0.01 ? ripple : 0.0;
    ripple = distFromCenter > 0.07 ? ripple : 0.0;

    vec3 color = mix(uDepthColor, uEdgeColor, mixStrength);


    //gl_FragColor = vec4(color + ripple, 1.0);

    vec3 finalColor = mix(uDepthColor, uEdgeColor, depthSmooth);

    float rippleMixStrength = depthSmooth;
    ripple = mod(rippleMixStrength - uTime * 0.05, 0.02);
    ripple = ripple > 0.01 ? ripple : 0.0;
    //ripple = distFromCenter > 0.1 ? ripple : 0.0;

    finalColor += ripple;

//    finalColor = clamp(
//        finalColor,
//        vec3(0.06),
//        vec3(1.0)
//    );
    // gl_FragColor = vec4(vec3(finalColor), 1.0);
    gl_FragColor = vec4(wave, 0.0, 0.0, 1.0);

    //gl_FragColor = vec4(vUv.y, 0.0, 0., 1.0);

    #include <colorspace_fragment>
}
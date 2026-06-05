uniform float uTime;

uniform vec3 uEdgeColor;
uniform vec3 uDepthColor;

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

void main() {
    // Final color
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    //float directionAngle = -1.1;
    float directionAngle = 0.63;

    // Water color based on depth
    float depthSmooth = texture2D(uDepthMapSmooth, vUv).r;
    finalColor = mix(uDepthColor, uEdgeColor, depthSmooth);

    vec2 dx = vec2(1.0e-1, 0.0);
    vec2 dy = vec2(0.0, 1.0e-1);
    float dDepthdx = texture2D(uDepthMapSmooth, vUv + dx).r - texture2D(uDepthMapSmooth, vUv - dx).r;
    dDepthdx /= 2.0 * dx.x;
    float dDepthdy = texture2D(uDepthMapSmooth, vUv + dy).r - texture2D(uDepthMapSmooth, vUv - dy).r;
    dDepthdy /= 2.0 * dy.y;

    vec2 grad = vec2(dDepthdx, dDepthdy);
    grad = grad / length(grad);
    vec2 pgrad = vec2(-grad.y, grad.x);

    // Ripples
    float rippleMixStrength = depthSmooth;
    float ripple = mod(rippleMixStrength, 0.1);
    ripple = ripple > 0.01 ? ripple : 0.0;
    //finalColor += ripple;

    vec2 mainDirection = vec2(sin(directionAngle), cos(directionAngle));
    pgrad = (pgrad.x * mainDirection.x + pgrad.y * mainDirection.y) > 0.0 ? pgrad : -pgrad;
    vec2 direction = uPhaseB * pgrad + (1.0 - uPhaseB) * mainDirection;
    // perpendicular direction
    vec2 d2 = vec2(-direction.y, direction.x);


    float prod = vUv.x * direction.x + vUv.y * direction.y;
    float p2 = vUv.x * d2.x + vUv.y * d2.y;
    float wave = 0.5 * sin(20.0 * prod + uTime) + 0.5;
    wave = smoothstep(0.5, 1.0, wave);
    float w2 = sin(200.0 * p2);
    float c1 = smoothstep(0.75, 1.0, w2);

    // Shore foam stripes
    // Give each stripe column a unique phase so they travel at staggered Y positions
    float stripeIndex = floor(vUv.x * 7.0);
    float stripePhase = fract(stripeIndex * 0.618); // golden ratio spacing avoids repetition
    float foamPattern = fract(vUv.y * depthSmooth * 4.0 + wave + uTime * 0.1);
    float foamBand = smoothstep(0.88, 1.0, foamPattern);
    // Segment the continuous band into small separated stripes
    float seg = fract(vUv.x * 7.0);
    float segMask = smoothstep(0.05, 0.3, seg) * (1.0 - smoothstep(0.55, 0.8, seg));
    float foam = foamBand * segMask * smoothstep(0.1, 0.4, depthSmooth);
    //finalColor = mix(finalColor, vec3(1.0), foam * 0.7);
    finalColor = mix(uDepthColor, uEdgeColor, wave * c1);

    gl_FragColor = vec4(vec3(finalColor), 1.0);

    #include <colorspace_fragment>
}
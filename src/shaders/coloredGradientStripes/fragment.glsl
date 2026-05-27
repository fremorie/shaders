precision mediump float;

uniform float uRepeatCount;
uniform float uRedStrength;
uniform float uGreenStrength;
uniform float uBlueStrength;

varying vec2 vUv;

void main() {
    float strength = floor(vUv.x * uRepeatCount) / uRepeatCount;

    float redChannel = strength * uRedStrength;
    float greenChannel = strength * uGreenStrength;
    float blueChannel = strength * uBlueStrength;

    vec4 color = vec4(
        redChannel,
        greenChannel,
        blueChannel,
        1.0
    );

    gl_FragColor = color;
}
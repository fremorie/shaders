precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

uniform vec3 uBaseColor;
uniform vec3 uNoiseColor;
uniform vec3 uCenterColor;
uniform vec3 uStripesColor;
uniform float uStripesNoiseStrength;
uniform float uVignetteStrength;
uniform float uPupilRadius;
uniform float uPupilDilation;
uniform vec3 uReflectionColor;
uniform float uReflectionSize;

varying vec2 vUv;

#define PI 3.1415926535

// Outer edge of the iris, where it fades into the sclera
const float IRIS_RADIUS = 0.8;
// Pupil size the iris pattern is authored at. Dilating away from it squeezes
// the fibres into the narrower ring that is left, instead of just covering them
const float RELAXED_PUPIL_RADIUS = 0.2;
// How much of the squeeze reaches the pattern. The tissue near the limbus is
// anchored in place, so following it all the way grinds the fibres into aliasing
const float FIBRE_FOLLOW = 0.6;

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash(float n) {
    return fract(sin(n)*43758.5453);
}

float noise(in vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = i.x + i.y*57.0;

    return mix(mix( hash(n+ 0.0), hash(n+ 1.0),f.x),
               mix( hash(n+57.0), hash(n+58.0),f.x),f.y);
}

float fbm (vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= m * 2.02;
    f += 0.2500 * noise(p); p *= m * 2.03;
    f += 0.1250 * noise(p); p *= m * 2.01;
    f += 0.0625 * noise(p); p *= m * 2.04;
    f /= 0.9375;

    return f;
}

void main() {
    // 1. Move the center to (0.5, 0.5) by substracting 0.5
    // 2. Change range from [-0.5, 0.5] to [-1, 1] by multiplying by 2
    vec2 uv = (vUv - 0.5) * 2.0;

    // Prevent from deformation on window resize
    uv.x *= uResolution.x / uResolution.y;

    vec3 background = vec3(1.0);
    vec3 color = vec3(1.0);

    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    vec2 direction = vec2(cos(angle), sin(angle));

    if (radius < IRIS_RADIUS) {
        // The pupil breathes around its base size. Animating the radius itself
        // keeps the rest of the eye still, unlike warping the whole coordinate
        float breathing = 0.5 + 0.5 * sin(uTime);
        float pupilRadius = uPupilRadius + uPupilDilation * breathing;
        pupilRadius = clamp(pupilRadius, 0.02, IRIS_RADIUS - 0.08);

        // A real pupil border is never a perfect circle. Sampling the noise on
        // the unit circle keeps the wobble continuous where the angle wraps
        pupilRadius *= 1.0 + 0.03 * (fbm(3.0 * direction + 17.0) - 0.5);

        // 0 at the pupil border, 1 at the limbus, whatever the pupil size
        float irisCoord = (radius - pupilRadius) / (IRIS_RADIUS - pupilRadius);

        // How much of its relaxed width the iris ring has left. Below 1.0 the
        // fibres are bunched together, which is what a dilating pupil does
        float irisCompression =
            (IRIS_RADIUS - pupilRadius) / (IRIS_RADIUS - RELAXED_PUPIL_RADIUS);

        // The same point mapped back onto the relaxed iris. Feeding the pattern
        // this instead of uv carries the fibres along with the pupil, so they
        // bunch up as it opens rather than being covered up by it
        float squeezedRadius = mix(RELAXED_PUPIL_RADIUS, IRIS_RADIUS, irisCoord);
        float patternRadius = mix(radius, squeezedRadius, FIBRE_FOLLOW);
        vec2 patternPosition = direction * patternRadius;

        // Bunched fibres lose definition, which also keeps the narrow ring left
        // by a wide pupil from aliasing into speckle
        float fibreDetail = mix(0.45, 1.0, clamp(irisCompression, 0.0, 1.0));

        color = uBaseColor;
        float mask = fbm(5.0 * patternPosition);
        color = mix(color, uNoiseColor, mask);

        // Warm halo bleeding out of the pupil, anchored to the pupil border
        mask = 1.0 - smoothstep(0.0, 0.5, irisCoord);
        color = mix(color, uCenterColor, mask);

        float wobblyAngle = angle + 0.05 * fbm(20.0 * patternPosition);

        mask = smoothstep(0.3, 1.0, fbm(vec2(6.0 * patternRadius, 20.0 * wobblyAngle)));
        color = mix(color, uStripesColor, mask * fibreDetail);

        mask = smoothstep(0.4, 0.9, fbm(vec2(10.0 * patternRadius, 15.0 * wobblyAngle)));
        color *= 1.0 - uStripesNoiseStrength * mask * fibreDetail;

        // Collarette: the ridge where the iris changes texture, roughly a third
        // of the way out. It rides with the pupil instead of sitting still
        float collarette = exp(-16.0 * (irisCoord - 0.3) * (irisCoord - 0.3));
        color *= 1.0 + 0.12 * collarette;

        // Pupillary ruff: the tissue right at the pupil border stays in shadow
        mask = 1.0 - smoothstep(0.0, 0.12, irisCoord);
        color *= 1.0 - 0.45 * mask;

        // Folded-up fibres catch less light, so a wide pupil reads darker
        color *= mix(0.88, 1.0, clamp(irisCompression, 0.0, 1.0));

        mask = smoothstep(0.6, IRIS_RADIUS, radius);
        color *= 1.0 - uVignetteStrength * mask;

        mask = smoothstep(pupilRadius, pupilRadius + 0.04, radius);
        color *= mask;

        // Corneal highlight sits in front of everything, so a dilated pupil
        // slides under it instead of swallowing it
        mask = 1.0 - smoothstep(0.0, uReflectionSize, length(uv - vec2(0.24, 0.2)));
        color += uReflectionColor * mask * 0.9;

        mask = smoothstep(0.7, IRIS_RADIUS, radius);
        color = mix(color, vec3(1.0), mask);
    }

    gl_FragColor = vec4(color * background, 1.0);
}

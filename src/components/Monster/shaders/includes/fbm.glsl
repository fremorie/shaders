// https://iquilezles.org/
// https://www.youtube.com/watch?v=emjuqqyq_qc&t=210s

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

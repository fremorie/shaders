#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = u_mouse / u_resolution;
	gl_FragColor = vec4(st.x, 1.0 - st.x, 0.0, 1.0);
}
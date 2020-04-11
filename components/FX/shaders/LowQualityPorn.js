import { GLSL } from "gl-react";
export default shaderCode = GLSL`

uniform sampler2D inputImageTexture;
uniform highp vec2 resolution;
const highp float amount = 50.;
varying highp vec2 uv;

void main() {

	highp float d = 1.0 / amount;
	highp float ar = resolution.x / resolution.y;
	highp float u = floor( uv.x / d ) * d;
	d = ar / amount;
	lowp float v = floor( uv.y / d ) * d;
	gl_FragColor = texture2D( inputImageTexture, vec2( u, v ) );

}


`;

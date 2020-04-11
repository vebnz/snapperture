import { GLSL } from "gl-react";
export default shaderCode = GLSL`
uniform sampler2D inputImageTexture;
varying highp vec2 uv;

void main() {
  highp float pixelDensity = 1.0;
  highp vec2 resolution = vec2(512,512);
	highp float size = 2. * pixelDensity;
	highp float dSize = 2. * size;

	highp float amount = resolution.x / size;
	highp float d = 1.0 / amount;
	highp float ar = resolution.x / resolution.y;
	highp float sx = floor( uv.x / d ) * d;
	d = ar / amount;
	highp float sy = floor( uv.y / d ) * d;

	highp vec4 base = texture2D( inputImageTexture, vec2( sx, sy ) );

	highp float lum = .2126 * base.r + .7152 * base.g + .0722 * base.b;
	highp float o = floor( 6. * lum );

	highp vec3 c1;
	highp vec3 c2;
	
	highp vec3 black = vec3( 0. );
	highp vec3 light = vec3( 85., 255., 255. ) / 255.;
	highp vec3 dark = vec3( 254., 84., 255. ) / 255.;
	highp vec3 white = vec3( 1. );

	/*dark = vec3( 89., 255., 17. ) / 255.;
	light = vec3( 255., 87., 80. ) / 255.;
	white = vec3( 255., 255., 0. ) / 255.;*/

	/*light = vec3( 85., 255., 255. ) / 255.;
	dark = vec3( 255., 86., 80. ) / 255.;*/

	if( o == 0. ) { c1 = black; c2 = c1; }
	if( o == 1. ) { c1 = black; c2 = dark; }
	if( o == 2. ) { c1 = dark;  c2 = c1; }
	if( o == 3. ) { c1 = dark;  c2 = light; }
	if( o == 4. ) { c1 = light; c2 = c1; }
	if( o == 5. ) { c1 = light; c2 = white; }
	if( o == 6. ) { c1 = white; c2 = c1; }

	if( mod( gl_FragCoord.x, dSize ) > size ) {
		if( mod( gl_FragCoord.y, dSize ) > size ) {
			base.rgb = c1;
		} else {
			base.rgb = c2;	
		}
	} else {
		if( mod( gl_FragCoord.y, dSize ) > size ) {
			base.rgb = c2;
		} else {
			base.rgb = c1;		
		}
	}

	gl_FragColor = vec4( base.rgb, base.a );

}
`;

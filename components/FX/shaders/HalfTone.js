import { GLSL } from "gl-react";
export default shaderCode = GLSL`

uniform sampler2D inputImageTexture;
uniform highp vec2 resolution;
const highp float amount = 1.0;
varying highp vec2 uv;

const highp float pixelSize = 15.0;

void main(void) {
	highp vec2 p = uv;
	highp float pixelsPerRow = resolution.x / pixelSize;
  highp float pixelsPerCol = resolution.y / pixelSize;
  
	highp float pixelSizeX = 1.0 / pixelsPerRow;	
	highp float dx = mod(p.x, pixelSizeX ) - pixelSizeX *0.5;
	highp float pixelSizeY = 1.0 / pixelsPerCol;	
	highp float dy = mod(p.y, pixelSizeY ) - pixelSizeY * 0.5;
	highp float pixelSize = pixelSizeX;//sqrt( pixelSizeX * pixelSizeX + pixelSizeY + pixelSizeY );

	p.x -= dx;
	p.y -= dy;
	highp vec3 col = texture2D(inputImageTexture, p).rgb;
  highp vec3 luma = vec3( .299, 0.587, 0.114 );
  
	highp float bright = dot( col.rgb, luma );
	highp float dist = sqrt(dx*dx + dy*dy);
	highp float rad = bright * pixelSize * 1.;
  highp float m = step( dist, rad/1.5 );
  
  highp vec3 col2 = mix(vec3(0.0), vec3(1.0), m);
  
	gl_FragColor = vec4(col2, 1.0);

}


`;

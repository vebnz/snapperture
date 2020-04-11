import { GLSL } from "gl-react";
export default shaderCode = GLSL`
varying highp vec2 uv;
uniform sampler2D inputImageTexture;
uniform highp vec2 resolution;

void main(void) {

	highp float x = 1.0 / resolution.x;
	highp float y = 1.0 / resolution.y;
  highp vec4 horizEdge = vec4( 0.0 );
  highp vec4 oTexColor = texture2D( inputImageTexture, uv);
  highp float factor = 2.0;

	horizEdge -= texture2D( inputImageTexture, vec2( uv.x - x, uv.y - y ) ) * (factor * 1.0);
	horizEdge -= texture2D( inputImageTexture, vec2( uv.x - x, uv.y     ) ) * (factor * 2.0);
	horizEdge -= texture2D( inputImageTexture, vec2( uv.x - x, uv.y + y ) ) * (factor * 1.0);
	horizEdge += texture2D( inputImageTexture, vec2( uv.x + x, uv.y - y ) ) * (factor * 1.0);
	horizEdge += texture2D( inputImageTexture, vec2( uv.x + x, uv.y     ) ) * (factor * 2.0);
	horizEdge += texture2D( inputImageTexture, vec2( uv.x + x, uv.y + y ) ) * (factor * 1.0);
	highp vec4 vertEdge = vec4( 0.0 );
	vertEdge -= texture2D( inputImageTexture, vec2( uv.x - x, uv.y - y ) ) * (factor * 1.0);
	vertEdge -= texture2D( inputImageTexture, vec2( uv.x    , uv.y - y ) ) * (factor * 2.0);
	vertEdge -= texture2D( inputImageTexture, vec2( uv.x + x, uv.y - y ) ) * (factor * 1.0);
	vertEdge += texture2D( inputImageTexture, vec2( uv.x - x, uv.y + y ) ) * (factor * 1.0);
	vertEdge += texture2D( inputImageTexture, vec2( uv.x    , uv.y + y ) ) * (factor * 2.0);
	vertEdge += texture2D( inputImageTexture, vec2( uv.x + x, uv.y + y ) ) * (factor * 1.0);
	highp vec3 edgeDetect = sqrt((horizEdge.rgb * horizEdge.rgb) + (vertEdge.rgb * vertEdge.rgb));
  
  highp vec4 sobel = vec4(1.0 - edgeDetect, oTexColor.a );
  
  highp vec3 luma = vec3( .299, 0.587, 0.114 );
	
  highp vec4 edge = vec4( vec3( dot( sobel.rgb, luma ) ), sobel.a );
  
  
  gl_FragColor = edge * oTexColor;
  
}

`;

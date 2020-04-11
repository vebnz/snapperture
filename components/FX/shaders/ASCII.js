import { GLSL } from "gl-react";
export default shaderCode = GLSL`
varying highp vec2 uv;
uniform sampler2D inputImageTexture;
uniform sampler2D asciiText;
const highp vec2 fontSize = vec2(8.0,16.0);

highp vec4 lookupASCII(lowp float asciiValue){

	highp vec2 pos = mod(gl_FragCoord.xy,fontSize.xy);

	pos = pos / vec2(2048.0,16.0);
	pos.x += asciiValue;
	return vec4(texture2D(asciiText,pos).rgb,1.0);
	
}

void main(void) {
  highp vec2 resolution = vec2(512.0,512.0);
  highp vec2 invViewport = vec2(0.5) / resolution;
	highp vec2 pixelSize = fontSize;
	highp vec4 sum = vec4(0.0);
	highp vec2 uvClamped = uv-mod(uv,pixelSize * invViewport);
	for (lowp float x=0.0;x<fontSize.x;x++){
		for (lowp float y=0.0;y<fontSize.y;y++){
			highp vec2 offset = vec2(x,y);
			sum += texture2D(inputImageTexture,uvClamped+(offset*invViewport));
		}
	}
	highp vec4 avarage = sum / vec4(fontSize.x*fontSize.y);
	highp float brightness = (avarage.x+avarage.y+avarage.z)*0.33333;
	highp vec4 clampedColor = floor(avarage*8.0)/8.0;
	highp float asciiChar = floor((1.0-brightness)*256.0)/256.0;
	gl_FragColor = clampedColor*lookupASCII(asciiChar);

}

`;

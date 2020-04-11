import { GLSL } from "gl-react";
export default shaderCode = GLSL`

uniform sampler2D inputImageTexture;
uniform highp vec2 resolution;
const lowp float levels = 2.0;

varying highp vec2 uv;

const highp vec3 kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
const highp vec3 kRGBToI = vec3 (0.596, -0.275, -0.321);
const highp vec3 kRGBToQ = vec3 (0.212, -0.523, 0.311);
const highp vec3 kYIQToR = vec3 (1.0, 0.956, 0.621);
const highp vec3 kYIQToG = vec3 (1.0, -0.272, -0.647);
const highp vec3 kYIQToB = vec3 (1.0, -1.107, 1.704);

highp vec3 hueShift(highp vec3 color, highp float hueAdjust ){

  highp float YPrime = dot (color, kRGBToYPrime);
  highp float I = dot (color, kRGBToI);
  highp float Q = dot (color, kRGBToQ);
  highp float hue = atan (Q, I);
  highp float chroma = sqrt (I * I + Q * Q);

  hue += hueAdjust;

  Q = chroma * sin (hue);
  I = chroma * cos (hue);

  highp vec3 yIQ   = vec3 (YPrime, I, Q);

  return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );

}

void main() {
  highp vec4 orig = texture2D(inputImageTexture, 2. * mod(uv, 0.5));

  
  highp vec3 col = floor(orig.bgr * vec3(levels)) / 2.*vec3(levels);
  
  if (uv.x > .5 && uv.y > .5) {
    col = hueShift(col, 0.);
  }
  if (uv.x < .5 && uv.y > .5) {
    col = hueShift(col, 1.7);
  }
  if (uv.x > .5 && uv.y < .5) {
    col = hueShift(col, 4.);
  }
  if (uv.x < .5 && uv.y < .5) {
    col = hueShift(col, .7);
  }

  
  gl_FragColor = vec4(col.rgb , 1.0);

  
  

}


`;

import { GLSL } from "gl-react";
export default shaderCode = GLSL`

uniform sampler2D inputImageTexture;
uniform highp vec2 resolution;
varying highp vec2 uv;

const highp float startX = 96.;
const highp float startY = 360.;
const highp float endX = 480.;
const highp float endY = 290.;


highp float random(lowp vec3 scale, lowp float seed) {\
  /* use the fragment position for a different seed per-pixel */\
  return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\
}

void main() {
  highp float blurRadius = 30.;
  highp float gradientRadius = 500.;


  highp vec2 start = vec2(startX, startY);
  highp vec2 end = vec2(endX, endY);

  highp float dx = endX-startX;
  highp float dy = endY-startY;

  highp float d = sqrt((dx*dx) + (dy*dy));
  
  highp vec2 delta = vec2(dx/d, dy/d);

  highp vec4 color = vec4(0.0);
  highp float total = 0.0;
  
  /* randomize the lookup values to hide the fixed number of samples */
  highp float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
  
  highp vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));
  highp float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - start, normal)) / gradientRadius) * blurRadius;
  for (lowp float t = -30.0; t <= 30.0; t++) {
    highp float percent = (t + offset - 0.5) / 30.0;
    highp float weight = 1.0 - abs(percent);
    highp vec4 sample = texture2D(inputImageTexture, uv + delta / resolution * percent * radius);
    
    /* switch to pre-multiplied alpha to correctly blur transparent images */
    sample.rgb *= sample.a;
    
    color += sample * weight;
    total += weight;
  }
  
  gl_FragColor = color / total;
}

`;

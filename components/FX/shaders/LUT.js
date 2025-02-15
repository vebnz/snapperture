import { GLSL } from "gl-react";
export default shaderCode = GLSL`
varying highp vec2 uv;

uniform sampler2D inputImageTexture;
uniform sampler2D lutTexture; // lookup texture
uniform lowp float intensity;
uniform bool shaderTricks;

uniform highp vec2 fxTextOffset;

void main()
{

  highp vec2 st = uv;
  //st.y = st.y * .75;
  if(shaderTricks) {
    st.y = st.y * (1080.0/1920.0);
  }

  highp vec4 textureColor = texture2D(inputImageTexture, st);

  highp vec2 totalOffset = fxTextOffset + uv;
  
  highp float blueColor = textureColor.b * 63.0;
  
  highp vec2 quad1;
  quad1.y = floor(floor(blueColor) / 8.0);
  quad1.x = floor(blueColor) - (quad1.y * 8.0);
  
  highp vec2 quad2;
  quad2.y = floor(ceil(blueColor) / 8.0);
  quad2.x = ceil(blueColor) - (quad2.y * 8.0);
  
  highp vec2 texPos1;
  texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);
  texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);
  texPos1.y = 1.0-texPos1.y;
  
  highp vec2 texPos2;
  texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);
  texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);
  texPos2.y = 1.0-texPos2.y;
  
  highp vec4 newColor1 = texture2D(lutTexture, texPos1);
  highp vec4 newColor2 = texture2D(lutTexture, texPos2);
  
  highp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));

  gl_FragColor = mix(textureColor, vec4(newColor.rgb, textureColor.w), intensity);


}
`;

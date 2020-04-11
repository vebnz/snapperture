import { GLSL } from "gl-react";
export default shaderCode = GLSL`
varying highp vec2 uv;

uniform sampler2D inputImageTexture;
uniform sampler2D overlay;
uniform sampler2D lutTexture; // lookup texture
uniform sampler2D cropMask;
uniform lowp float maskRotate;
uniform lowp float overlayRotate;
uniform lowp float intensity;
uniform bool shaderTricks;
uniform highp float overlayAspect;

uniform highp vec2 fxTextOffset;

highp vec2 rotateUV(highp vec2 uv, highp float rotation)
{
  highp float mid = 0.5;
  return vec2(
    cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
    cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
  );
}

void main()
{

  highp vec2 st = uv;
  //st.y = st.y * .75;
  if(shaderTricks) {
    st.y = st.y * (1080.0/1920.0);
  }
  
  
  highp vec4 textureColor = texture2D(inputImageTexture, st);


  // highp vec2 overlayUV = rotateUV(uv, overlayRotate);
  // highp vec2 totalOffset = fxTextOffset + overlayUV;

  
  highp vec2 totalOffset = fxTextOffset + uv;
  highp vec2 overlayUV = rotateUV(totalOffset, overlayRotate);

  highp vec4 overlayColor = texture2D(overlay, overlayUV);
  
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
  
  lowp vec4 newColor1 = texture2D(lutTexture, texPos1);
  lowp vec4 newColor2 = texture2D(lutTexture, texPos2);
  
  lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));

  lowp vec4 filteredColor = mix(textureColor, vec4(newColor.rgb, textureColor.w), intensity);

  highp vec2 maskuv = rotateUV(uv, maskRotate);
  highp vec4 maskOverlayColor = texture2D(cropMask, maskuv);
  highp vec4 maskColor = vec4(1.0, 1.0, 1.0, 1.0);
  highp vec4 maskWithFilterColor = mix(filteredColor, maskOverlayColor, maskOverlayColor.a);


  highp vec4 inverseOverlayColor = vec4(overlayColor.r-maskWithFilterColor.r,overlayColor.g-maskWithFilterColor.g,overlayColor.b-maskWithFilterColor.b,overlayColor.a);
  gl_FragColor = mix(maskWithFilterColor, inverseOverlayColor, overlayColor.a);
}
`;

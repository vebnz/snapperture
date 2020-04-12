import { GLSL } from "gl-react";
export default shaderCode = GLSL`
varying highp vec2 uv;

uniform sampler2D inputImageTexture;
uniform sampler2D overlay;
uniform sampler2D cropMask;
uniform lowp float maskRotate;
uniform lowp float overlayRotate;
uniform highp vec2 fxTextOffset;
uniform lowp float maskOpacity;

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
  highp vec4 color = texture2D(inputImageTexture, uv);
  highp vec2 totalOffset = fxTextOffset + uv;
  highp vec2 overlayUV = rotateUV(totalOffset, overlayRotate);

  highp vec4 overlayColor = texture2D(overlay, overlayUV);
  
  highp vec2 maskuv = rotateUV(uv, maskRotate);
  highp vec4 maskColor = texture2D(cropMask, maskuv);
  
  highp vec4 maskWithColor = mix(color, maskColor, maskOpacity*maskColor.a);

  highp vec4 inverseOverlayColor = vec4(overlayColor.r-maskWithColor.r,overlayColor.g-maskWithColor.g,overlayColor.b-maskWithColor.b,overlayColor.a);
  gl_FragColor = mix(maskWithColor, inverseOverlayColor, overlayColor.a);
}
`;

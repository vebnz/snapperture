import React, { Component } from "react";
import { GLSL, Node, Shaders } from "gl-react";

import filterConsts from "../../constants/Filters";

const shaders = Shaders.create({
  LUT: {
    frag: GLSL`
varying highp vec2 uv;

uniform sampler2D inputImageTexture;
uniform sampler2D overlay;
uniform sampler2D lutTexture; // lookup texture

uniform lowp float intensity;

void main()
{
  highp vec4 textureColor = texture2D(inputImageTexture, uv);
  highp vec4 overlayColor = texture2D(overlay, uv);
  
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
  gl_FragColor = mix(filteredColor, overlayColor, overlayColor.a);
}
    `
  }
});

const FX = props => {
  const { children: inputImageTexture, overlay, filter, intensity } = props;
  let lutTexture = "";
  let noFilter = false;
  
  let filterObj = filterConsts.find(element => element.value === filter.value)

  if(!filterObj) { filterObj = filterConsts[0]}
  if(filterObj) {
    lutTexture = filterObj.lut
    return (
      <Node
        shader={shaders.LUT}
        ignoreUnusedUniforms
        uniforms={{ 
          inputImageTexture,
          overlay, 
          lutTexture, 
          intensity
        }}
      />
    );
  }
  
  return props.children
  
  // return <Node shader={shaders.FX} uniforms={{ t, factor }} />;
};

FX.defaultProps = {
  factor: 1,
  intensity: 1
};
export default FX;

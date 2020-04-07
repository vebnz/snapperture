import React, { Component, useEffect, useState } from "react";
import { GLSL, Node, Shaders } from "gl-react";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import filterConsts from "../../constants/Filters";
import { Asset } from "expo-asset";
import "webgltexture-loader-expo";
import { loadAsset } from "webgltexture-loader-expo/lib/ExpoModuleTextureLoader";
import { resolveAsync, fromUriAsync } from "expo-asset-utils";
import { Platform } from "react-native";

const shaders2 = Shaders.create({
  Passthrough: {
    // NB we need to YFlip the stream
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main() {
  gl_FragColor = texture2D(t, uv);
}
`,
  },
});

const shaders = Shaders.create({
  LUT: {
    frag: GLSL`
varying highp vec2 uv;

uniform sampler2D inputImageTexture;
uniform sampler2D overlay;
uniform sampler2D lutTexture; // lookup texture
uniform sampler2D cropMask;
uniform lowp float maskRotate;
uniform lowp float overlayRotate;
uniform lowp float intensity;

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
  highp vec4 textureColor = texture2D(inputImageTexture, uv);
  highp vec2 overlayuv = rotateUV(uv, overlayRotate);
  highp vec4 overlayColor = texture2D(overlay, overlayuv);
  
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
  highp vec4 maskWithFilterColor = mix(filteredColor, maskColor, maskOverlayColor.a);

  gl_FragColor = mix(maskWithFilterColor, overlayColor, overlayColor.a);
}
`,
  },
});

const FX = props => {
  let { children: inputImageTexture, overlay, filter, intensity, frameOptions } = props;
  let lutTexture = "";
  let noFilter = false;

  const [textOverlay, setTextOverlay] = useState(
    Asset.fromModule(require("../../assets/masks/blank.png"))
  );

  useEffect(() => {
    async function loadOverlay() {
      try {
        
        let txoverlay = null
        console.log("loadOverlay -> props.overlays", props.overlay);
        if (Platform.OS === 'android') {
          txoverlay = await loadAsset(props.overlay);
        } else {
          txOverlay = await resolveAsync(`file://${props.overlay}`);
        }
        console.log("overlay srxc", txoverlay);
        setTextOverlay(txoverlay);  
      } catch (error) {
        console.log("loadOverlay -> error", error)
      }
    }
    loadOverlay()
  }, [props.overlay, frameOptions])

  let filterObj = filterConsts.find(element => element.value === filter.value)

  if (!filterObj) { filterObj = filterConsts[0] }
  if (filterObj) {
    lutTexture = Asset.fromModule(filterObj.lut)
    //overlay = { uri: 'https://img.icons8.com/android/2x/download-2.png' }
    
    return (
      <Node
        shader={shaders.LUT}
        ignoreUnusedUniforms
        uniforms={{
          inputImageTexture,
          overlay: textOverlay,
          overlayRotate: frameOptions.overlayRotate,
          lutTexture,
          intensity,
          cropMask: Asset.fromModule(frameOptions.cropMask),
          maskRotate: frameOptions.rotate,
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

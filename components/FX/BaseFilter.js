import { Asset } from "expo-asset";
import { Node, Shaders } from "gl-react";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import "webgltexture-loader-expo";
import filterConsts from "../../constants/Filters";

const BaseFilter = (props) => {
  let { children: inputImageTexture, fxTextOffset, filter, intensity } = props;
  let lutTexture = "";

  const [shaders, setShaders] = useState(
    Shaders.create({ SHADER: { frag: filterConsts[0].shader } })
  );

  const [currentFilterShaderName, setCurrentFilterShaderName] = useState(
    filterConsts[0].shaderName
  );

  useEffect(() => {
    console.log("shader rebooted?")
  })

  useEffect(() => {
    console.log("BaseFilter -> filter.shaderName", filter.shaderName)
    setShaders(
      Shaders.create({
        SHADER: {
          frag: filter.shader,
        },
      })
    );
    
  }, [props.filter.shaderName]);

  const assetUniforms = {
    asciiText: Asset.fromModule(
      require("../../assets/images/8x16_ascii_font_sorted.gif")
    ),
    resolution: [1080, 1080],
  };

  lutTexture = Asset.fromModule(filter.lut);
  //overlay = { uri: 'https://img.icons8.com/android/2x/download-2.png' }

  const uniforms = {
    inputImageTexture,
    lutTexture,
    intensity,
    shaderTricks: Platform.OS === "ios",
    fxTextOffset,
    ...assetUniforms,
  };
  return (
    <Node shader={shaders.SHADER} ignoreUnusedUniforms uniforms={uniforms} />
  );
};

BaseFilter.defaultProps = {
  factor: 1,
  intensity: 1,
  overlayRotate: 0,
};
export default BaseFilter;

import { Asset } from "expo-asset";
import { Node, Shaders } from "gl-react";
import React from "react";
import { Platform } from "react-native";
import "webgltexture-loader-expo";
import filterConsts from "../../constants/Filters";

const BaseFilter = (props) => {
  let { children: inputImageTexture, fxTextOffset, filter, intensity } = props;
  let lutTexture = "";

  const assetUniforms = {
    asciiText: Asset.fromModule(
      require("../../assets/images/8x16_ascii_font_sorted.gif")
    ),
    resolution: [1080, 1080],
  };

  let filterObj = filterConsts.find(
    (element) => element.value === filter.value
  );

  if (!filterObj) {
    filterObj = filterConsts[0];
  }
  if (filterObj) {
    lutTexture = Asset.fromModule(filterObj.lut);
    //overlay = { uri: 'https://img.icons8.com/android/2x/download-2.png' }

    const shaders = Shaders.create({
      SHADER: {
        frag: filterObj.shader,
      },
    });

    const uniforms = {
      inputImageTexture,
      lutTexture,
      intensity,
      shaderTricks: Platform.OS === "ios",
      fxTextOffset,
      ...assetUniforms,
    }
    console.log("BaseFilter -> uniforms", uniforms)
    return (
      <Node
        shader={shaders.SHADER}
        ignoreUnusedUniforms
        uniforms={uniforms}
      />
    );
  }

  return props.children;

  // return <Node shader={shaders.FX} uniforms={{ t, factor }} />;
};

BaseFilter.defaultProps = {
  factor: 1,
  intensity: 1,
  overlayRotate: 0,
};
export default BaseFilter;

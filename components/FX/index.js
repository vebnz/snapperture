import { Asset } from "expo-asset";
import { resolveAsync } from "expo-asset-utils";
import { GLSL, Node, Shaders } from "gl-react";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import "webgltexture-loader-expo";
import { loadAsset } from "webgltexture-loader-expo/lib/ExpoModuleTextureLoader";
import filterConsts from "../../constants/Filters";
import shaderCode from './shaders/LUT'
const shaders = Shaders.create({
  SHADER: {
    frag: shaderCode,
  },
});

const FX = (props) => {
  let {
    children: inputImageTexture,
    fxTextOffset,
    filter,
    intensity,
    frameOptions,
  } = props;
  let lutTexture = "";
  let noFilter = false;

  const [textOverlay, setTextOverlay] = useState(
    Asset.fromModule(require("../../assets/masks/blank.png"))
  );

  const assetUniforms = {
    asciiText: Asset.fromModule(require("../../assets/images/8x16_ascii_font_sorted.gif")),
    resolution: [1080, 1080]
  }

  useEffect(() => {
    async function loadOverlay() {
      try {
        let txoverlay = null;
        if (Platform.OS === "android") {
          txoverlay = await loadAsset(props.overlay);
        } else {
          txoverlay = await resolveAsync(`file://${props.overlay.uri}`); //this fucking thing
          //storytime:
          //resolveAsync works in android (sort of)
          //react-native-view-shot.captureRef returns a uri formatted string
          //ios returns a posix file path...
          //so to make resolved Expo assets from ios internal file system (that isnt already assets/cameraroll)
          //need to prepend file://
          //stupid
        }
        setTextOverlay(txoverlay);
      } catch (error) {
        console.log("loadOverlay -> error", error);
      }
    }
    loadOverlay();
  }, [props.overlay, frameOptions]);

  let filterObj = filterConsts.find(
    (element) => element.value === filter.value
  );

  if (!filterObj) {
    filterObj = filterConsts[0];
  }
  if (filterObj) {
    lutTexture = Asset.fromModule(filterObj.lut);
    //overlay = { uri: 'https://img.icons8.com/android/2x/download-2.png' }

    return (
      <Node
        shader={shaders.SHADER}
        ignoreUnusedUniforms
        uniforms={{
          inputImageTexture,
          overlay: textOverlay,
          overlayRotate: props.overlayRotate,
          overlayAspect: textOverlay.width / textOverlay.height,
          lutTexture,
          intensity,
          cropMask: Asset.fromModule(frameOptions.cropMask),
          maskRotate: frameOptions.rotate,
          shaderTricks: Platform.OS === "ios",
          fxTextOffset,
          ...assetUniforms
        }}
      />
    );
  }

  return props.children;

  // return <Node shader={shaders.FX} uniforms={{ t, factor }} />;
};

FX.defaultProps = {
  factor: 1,
  intensity: 1,
  overlayRotate: 0,
};
export default FX;

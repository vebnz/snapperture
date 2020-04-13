import { Asset } from "expo-asset";
import { resolveAsync } from "expo-asset-utils";
import { GLSL, Node, Shaders } from "gl-react";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import "webgltexture-loader-expo";
import { loadAsset } from "webgltexture-loader-expo/lib/ExpoModuleTextureLoader";
import Overlay from "./shaders/Overlay";
import BaseFilter from "./BaseFilter";

const OverlayNode = (props) => {
  let { children: inputImageTexture, fxTextOffset, frameOptions } = props;

  const [oShader, setShaders] = useState(
    Shaders.create({
      OVERLAY: {
        frag: Overlay,
      },
    })
  );

  useEffect(() => {
    setShaders(
      Shaders.create({
        OVERLAY: {
          frag: Overlay,
        },
      })
    );
  }, []);
  const [textOverlay, setTextOverlay] = useState(
    Asset.fromModule(require("../../assets/masks/blank.png"))
  );

  const assetUniforms = {
    asciiText: Asset.fromModule(
      require("../../assets/images/8x16_ascii_font_sorted.gif")
    ),
    resolution: [1080, 1080],
  };

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

  const uniforms = {
    inputImageTexture,
    overlay: textOverlay,
    overlayRotate: props.overlayRotate,
    overlayAspect: textOverlay.width / textOverlay.height,
    maskOpacity: props.opacity,
    cropMask: Asset.fromModule(frameOptions.cropMask),
    maskRotate: frameOptions.rotate,
    shaderTricks: Platform.OS === "ios",
    fxTextOffset,
    ...assetUniforms,
  };
  return (
    <Node shader={oShader.OVERLAY} ignoreUnusedUniforms uniforms={uniforms}>
      <BaseFilter {...props} />
    </Node>
  );
};

OverlayNode.defaultProps = {
  factor: 1,
  intensity: 1,
  overlayRotate: 0,
};
export default OverlayNode;

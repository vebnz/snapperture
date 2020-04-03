import React, { useState } from "react";
import { GLSL, Node, Shaders, Uniform } from "gl-react";
import { View } from "react-native";
import { Colors, Text } from "react-native-paper";
import Expo2DContext from "expo-2d-context";
import { GLView } from "expo-gl";

import ViewShot from "react-native-view-shot";

const shaders = Shaders.create({
  TextOverlay: {
    // NB we need to YFlip the stream
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main() {
  gl_FragColor = texture2D(t, uv) * vec4(1.0, 1.0, 1.0, 1.0);
}
`
  }
});

const TextFx = props => {
  const [renderedNode, setRenderedNode] = useState(false);

  const onCapture = uri => {
    console.log("TextFx -> uri", uri);
    setRenderedNode(uri);
  };

  const { children, text, canvasHeight, canvasWidth } = props;
  console.log("children", children)
  
  return <Node shader={shaders.TextOverlay} uniforms={{ t: children }} />;
};
TextFx.defaultProps = {
  text: "SAMPLE"
};

export default TextFx;

import React from "react";
import { GLSL, Node, Shaders, Uniform } from "gl-react";
import { View } from "react-native";
import { Colors, Text } from "react-native-paper";
import Expo2DContext from "expo-2d-context";
import { GLView } from "expo-gl";

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

const TextNode = ({ children: t }) => (
  <Node shader={shaders.TextOverlay} uniforms={{ t }} />
);

const TextFx = (props) => {
  const onGLContextCreate = async (gl, text, canvasWidth, canvasHeight) => {
    console.log("onGLContextCreate -> gl", gl)
    // var ctx = new Expo2DContext(gl);
    // console.log("onGLContextCreate -> ctx", ctx)
    // await ctx.initializeText();

    // ctx.fillStyle = "#333399";
    // ctx.fillRect(0, 0, ctx.width, ctx.height);

    // ctx.fillStyle = "white";
    // ctx.font = "italic 72pt sans-serif";
    // ctx.fillText(text, 10, 100);

    // ctx.flush();
       gl.clearColor(0, 0, 1, 1);
       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
       gl.endFrameEXP();
  };

  const { text, canvasHeight, canvasWidth } = props;
  
  return (
    // <TextNode>
      <GLView
        style={{ flex: 1, height: 200, width: "100%" }}
        onContextCreate={gl => {
          onGLContextCreate(gl, text, canvasWidth, canvasHeight);
        }}
      />
    // </TextNode>
  );
};
TextFx.defaultProps = {
  text: "SAMPLE"
};

export default TextFx;

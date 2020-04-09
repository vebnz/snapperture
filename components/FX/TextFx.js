import { GLSL, Node, Shaders } from "gl-react";
import React, { useState } from "react";


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

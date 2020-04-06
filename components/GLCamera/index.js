import React, { Component } from "react";
import { GLSL, Node, Shaders } from "gl-react";
import { Camera } from "expo-camera";
import "webgltexture-loader-expo-camera";

const shaders = Shaders.create({
  YFlip: {
    // NB we need to YFlip the stream
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main(){
  gl_FragColor=texture2D(t, vec2(1.0-uv.x, 1.0 - uv.y));
}`
  }
});

class GLCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.camera = null;
  }
  async componentDidMount() {
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      this.forceUpdate();
    };
    this._raf = requestAnimationFrame(loop);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
  }

  onCameraRef = camera => {
    this.camera = camera;
  };
  render() {
    const { position } = this.props;
    
    const type = Camera.Constants.Type[position];
    return (
      <Node
        blendFunc={{ src: "one", dst: "one minus src alpha" }}
        shader={shaders.YFlip}
        uniforms={{
          t: this.camera
        }}
      >
        <Camera
          style={{
            aspectRatio: 1,
            width: this.props.width,
            height: this.props.height
          }}
          ratio="1:1"
          type={type}
          ref={this.onCameraRef}
          
        />
      </Node>
    );
  }
}

GLCamera.defaultProps = {
  position: "front",
  width: 400,
  height: 533.33
};

export default GLCamera;

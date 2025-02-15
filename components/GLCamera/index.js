import React, { Component } from "react";
import { GLSL, Node, Shaders } from "gl-react";
import { Camera } from "expo-camera";
import "webgltexture-loader-expo-camera";
import { AppState } from "react-native";

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
    this.camera = null;
  }
  async componentDidMount() {
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      this.forceUpdate();
    };
    this._raf = requestAnimationFrame(loop);
  }
  componentWillUnmount = () => {
    console.log("GLCamera -> componentWillUnmount -> this._raf", this._raf)
    if (!!this._raf) {
      cancelAnimationFrame(this._raf)
      this._raf == undefined;
    }
  }

  onCameraRef = camera => {
    this.camera = camera;
  };

  onCameraReady = async () => {
    const sizes = await this.camera.getAvailablePictureSizesAsync('1:1')
    
  //     20:06
  // GLCamera -> onCameraReady -> ratios, sizes Array [
  //   "640x480",
  //   "Photo",
  //   "High",
  //   "3840x2160",
  //   "352x288",
  //   "1280x720",
  //   "Medium",
  //   "Low",
  //   "1920x1080",
  // ]
  //so, ios doesnt support SQUARE viewport sizes... this is what a 1:1 ratio is for ios.  don't know what "high" or "photo" aspect ratios are
  // but we can work with a 1920x1080 i guess
  // edit: ios seems to be default 16:9 aspect ratio see FX.js fragment shader

  }

  render() {
    const { position } = this.props;
    
    const type = Camera.Constants.Type[position];
    return (
      <Node
        blendFunc={{ src: "one", dst: "one minus src alpha" }}
        shader={shaders.YFlip}
        uniforms={{
          t: this.camera,
        }}
      >
        <Camera
          // style={{width: this.props.width, height: this.props.height}}
          ratio="1:1"
          type={type}
          ref={this.onCameraRef}
          onCameraReady={this.onCameraReady}
          videoStabilizationMode={Camera.Constants.VideoStabilization.cinematic}
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

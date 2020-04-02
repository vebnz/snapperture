
import { withNavigationFocus } from "@react-navigation/compat";
import { Camera } from "expo-camera";
import { Surface } from "gl-react-native";
import React, { Component } from "react";
import { View, Slider,  } from "react-native";
import { Text, Button, Title } from "react-native-paper";
import FX from "../components/FX";

import GLCamera from "../components/GLCamera";
import FilterPicker from "../components/FilterPicker";
import neutral from '../assets/filters/neutral-lut.png'
import filterConsts from "../constants/Filters";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: "front",
      width: false,
      height: false,
      intensity: 1,
      filter: filterConsts[0]
    };
    this.camera = null;
    this.surface = null;
    this.navigationListener = null;
  }

  componentDidMount = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });

    this.navigationListener = this.props.navigation.addListener("blur", e => {
      if (this.camera) {
        console.log("HomeScreen -> componentDidMount -> blur -> e", e);
        this.camera.pausePreview();
      }
    });
    this.navigationListener = this.props.navigation.addListener("focus", e => {
      if (this.camera) {
        console.log("HomeScreen -> componentDidMount -> focus ->e", e);
        this.camera.resumePreview();
      }
    });
  };

  componentWillUnmount = () => {
    console.log("cameraview->componentWillUnmount");
  };

  onCameraError = error => {
    console.log("onCameraError -> error", error);
  };

  onLayout = evt => {
    const { width, height } = evt.nativeEvent.layout;
    this.setState({
      width,
      height
    });
  };

  onSelectFilter = (filter) => {
    console.log("HomeScreen -> onSelectFilter -> filter", filter)
    this.setState({filter})
    
  }

  onFlipPress = () => {
    this.setState({type: this.state.type=="front" ? "back": "front"})
  }

  onSurfaceCapture = async () => {
    if (this.surface) {
      const url = await this.surface.glView.capture()
      
      console.log("HomeScreen -> onSurfaceCapture -> url", url)
//Returns:  see what you can do with it
//       {
//   "height": 1080,
//   "localUri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540avwave%252Fcalograph/GLView/95aedd20-953e-4dd7-926d-594edb282d15.jpeg",
//   "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540avwave%252Fcalograph/GLView/95aedd20-953e-4dd7-926d-594edb282d15.jpeg",
//   "width": 1080,
// }
    }
  }

  render() {
    const { width, height, hasPermission, type, intensity, filter } = this.state;
    console.log("HomeScreen -> render -> this.state", this.state);

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (!this.props.navigation.isFocused()) {
      return <Text>Camera delayed rendering</Text>;
    }

    if (!width && !height) {
      return <View style={{ flex: 1 }} onLayout={this.onLayout} />;
    }
    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        <Surface
          ref={surface => (this.surface = surface)}
          style={{ aspectRatio: 1, width, height: width }}
        >
          <FX filter={filter} intensity={intensity}>
            {/* {{ uri: "http://www.pwcphoto.com/images/test80.jpg" }} */}
            {/* {neutral} */}
            <GLCamera position={type} height={height} width={width} />
          </FX>
        </Surface>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Title style={{ flex: 1, textAlign: "center" }}>{filter.name}</Title>
          <Button
            style={{ marginBottom: 10 }}
            mode="contained"
            onPress={this.onFlipPress}
          >
            Flip
          </Button>
          <FilterPicker onSelectFilter={this.onSelectFilter} />
          <Text style={{ paddingTop: 10, textAlign: "center" }}>
            Filter Intensity
          </Text>
          <Slider
            style={{ height: 40 }}
            value={1}
            minimumValue={0}
            maximumValue={1.25}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#ff0000"
            onValueChange={value => this.setState({ intensity: value })}
          />
          <Button
            style={{ marginTop: 10 }}
            mode="contained"
            icon="camera"
            onPress={this.onSurfaceCapture}
          >
            Capture
          </Button>
        </View>
      </View>
    );
  }
}

export default withNavigationFocus(HomeScreen);

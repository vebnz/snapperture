import { withNavigationFocus } from "@react-navigation/compat";
import { Camera } from "expo-camera";
import { Surface as GLSurface } from "gl-react-native";
import React, { Component } from "react";
import { View, Slider } from "react-native";
import { Text, Button, Title, Surface, FAB, Colors, IconButton } from "react-native-paper";
import FX from "../components/FX";

import GLCamera from "../components/GLCamera";
import FilterPicker from "../components/FilterPicker";

import filterConsts from "../constants/Filters";
import TopAppBar from "../navigation/AppBar";
import TextFx from "../components/FX/TextFx";
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
    this.navigationBlurListener = null;
    this.navigationFocusListener = null;
    this.navigationStateListener = null;
  }

  componentDidMount = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });

    this.navigationBlurListener = this.props.navigation.addListener(
      "blur",
      e => {
        if (this.camera) {
          this.camera.pausePreview();
        }
      }
    );
    this.navigationFocusListener = this.props.navigation.addListener(
      "focus",
      e => {
        if (this.camera) {
          this.camera.resumePreview();
        }
      }
    );
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

  onSelectFilter = filter => {
    this.setState({ filter });
  };

  onFlipPress = () => {
    this.setState({ type: this.state.type == "front" ? "back" : "front" });
  };

  onSurfaceCapture = async () => {
    if (this.surface) {
      const {
        height,
        localUri,
        uri,
        width
      } = await this.surface.glView.capture();

      this.props.navigation.navigate("Share", { height, localUri, uri, width });
      
    }
  };

  render() {
    const {
      width,
      height,
      hasPermission,
      type,
      intensity,
      filter
    } = this.state;

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
        <TopAppBar />
        <View style={{ aspectRatio: 1, width, height: width }}>
          {/* <TextFx text="DERPYDERP DERP" canvasHeight={width} canvasWidth={width}/>   */}
          <GLSurface
            ref={surface => (this.surface = surface)}
            style={{ aspectRatio: 1, width, height: width }}
          >
            <FX filter={filter} intensity={intensity}>
              {/* <TextFx text="DERPYDERP DERP" canvasHeight={width} canvasWidth={width}/>   */}
              <GLCamera position={type} height={height} width={width} />
            </FX>
          </GLSurface>

          <FAB
            style={{ position: "absolute", top: 0, right: 0, margin: 20 }}
            small
            icon={`camera-${type === "front" ? "rear" : "front"}`}
            onPress={this.onFlipPress}
          />
          <IconButton
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              margin: 10
            }}
            icon="camera-iris"
            color={Colors.white}
            size={40}
            onPress={this.onSurfaceCapture}
          />
        </View>
        <Surface style={{ flex: 1, justifyContent: "flex-end" }}>
          <Title style={{ flex: 1, textAlign: "center" }}>{filter.name}</Title>
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
        </Surface>
      </View>
    );
  }
}

export default withNavigationFocus(HomeScreen);

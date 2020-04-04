import { withNavigationFocus } from "@react-navigation/compat";
import { Camera } from "expo-camera";
import { Surface as GLSurface } from "gl-react-native";
import React, { Component } from "react";
import { View, Slider, Image } from "react-native";
import {
  Text,
  Button,
  Title,
  Surface,
  FAB,
  Colors,
  IconButton
} from "react-native-paper";
import FX from "../components/FX";

import GLCamera from "../components/GLCamera";
import FilterPicker from "../components/FilterPicker";

import filterConsts from "../constants/Filters";
import TopAppBar, {
  ACTION_FILTER,
  ACTION_FRAME,
  ACTION_TEXT
} from "../navigation/AppBar";
import TextFx from "../components/FX/TextFx";
import ViewShot from "react-native-view-shot";
import CaptionView from "../components/CaptionView";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: "front",
      width: false,
      height: false,
      intensity: 1,
      filter: filterConsts[0],
      renderedNode: null,
      action: ACTION_FILTER,
      captionText: ''
    };
    this.camera = null;
    this.surface = null;
    this.captionRef = null;
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
  onCapture = uri => {
    this.setState({ renderedNode: { uri: uri } });
  };

  renderActionPanel = () => {
    switch (this.state.action) {
      case ACTION_FILTER:
        return (
          <FilterPicker
            onSelectFilter={this.onSelectFilter}
            onSetIntensity={value => this.setState({ intensity: value })}
          />
        );
      case ACTION_FRAME:
        return (
          <Surface>
            <Title>FRAME</Title>
          </Surface>
        );
      case ACTION_TEXT:
        return (
          <CaptionView
            captionText={this.state.captionText}
            onSetCaptionText={captionText => {
              this.setState({ captionText })
            }}
            onRenderCaption={() => {
              this.captionRef.capture()
            }}
          />
        );
      default:
        break;
    }
  };
  render() {
    const {
      width,
      height,
      hasPermission,
      type,
      intensity,
      filter,
      renderedNode
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
        <TopAppBar
          activeAction={this.state.action}
          onAppBarActionButtonPress={action => this.setState({ action })}
        />
        <View style={{ position: "absolute", zIndex: -1 }}>
          <ViewShot
            ref={captionRef => (this.captionRef = captionRef)}
            style={{ aspectRatio: 1, width, height: width }}
            onCapture={this.onCapture}
            options={{ format: "png" }}
          >
            <Title style={{ color: Colors.white }}>
              {this.state.captionText}
            </Title>
          </ViewShot>
        </View>
        <View style={{ aspectRatio: 1, width, height: width }}>
          <GLSurface
            ref={surface => (this.surface = surface)}
            style={{ aspectRatio: 1, width, height: width }}
          >
            <FX filter={filter} intensity={intensity} overlay={renderedNode}>
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
        {this.renderActionPanel()}
      </View>
    );
  }
}

export default withNavigationFocus(HomeScreen);

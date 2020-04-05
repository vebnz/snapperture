import { withNavigationFocus } from "@react-navigation/compat";
import { Camera } from "expo-camera";
import { Surface as GLSurface } from "gl-react-native";
import React, { Component } from "react";
import { View, Slider, Image, TouchableHighlightBase, Platform } from "react-native";
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
import Constants from "expo-constants";
import GLCamera from "../components/GLCamera";
import FilterPicker from "../components/FilterPicker";
import * as IntentLauncherAndroid from 'expo-intent-launcher'
import defaultMask from '../assets/masks/portrait.png'
import test80 from '../assets/images/test80.jpg'
import filterConsts from "../constants/Filters";
import TopAppBar, {
  ACTION_FILTER,
  ACTION_FRAME,
  ACTION_TEXT
} from "../navigation/AppBar";
import TextFx from "../components/FX/TextFx";
import ViewShot from "react-native-view-shot";
import { CaptionView, CaptionRenderBox } from "../components/CaptionView";
import FramePicker from "../components/FramePicker";
import frameConsts from '../constants/Frames';
import { Linking } from "expo";
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
      action: ACTION_TEXT,
      captionText: "",
      captionOptions: {},
      frameOptions: frameConsts[0],
      fontSize: 20
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
        if (this.camera && this.camera.camera) {
          this.camera.camera.pausePreview();
        }
      }
    );
    this.navigationFocusListener = this.props.navigation.addListener(
      "focus",
      e => {
        if (this.camera && this.camera.camera) {
          this.camera.camera.resumePreview();
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
  onSelectFrame = frame => {
    this.setState({frameOptions: frame})
  }

  onFlipPress = () => {
    this.setState({ type: this.state.type == "front" ? "back" : "front" });
  };

  onSurfaceCapture = async () => {
    try {
      if (this.surface) {
        if (this.camera && this.camera.camera) {
          // await this.camera.camera.takePictureAsync()
          const {
            height,
            localUri,
            uri,
            width
          } = await this.surface.glView.capture();
    
          this.props.navigation.navigate("Share", { height, localUri, uri, width });
        }
      }
    } catch (error) {
    console.log("HomeScreen -> onSurfaceCapture -> error", error)
      
    }
  };
  onCapture = uri => {
    this.setState({ renderedNode: { uri: uri } });
  };

  onReadyCapture = () => {
    if (this.captionRef) {
      this.captionRef.capture();
    }
  };
  onPauseCamera = pause => {
    if (this.camera && this.camera.camera) {
      pause ? this.camera.camera.pausePreview() : this.camera.camera.resumePreview();
    }
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
        return <FramePicker onSelectFrame={this.onSelectFrame} />;
      case ACTION_TEXT:
        return (
          <CaptionView
            cameraPause={this.onPauseCamera}
            captionText={this.state.captionText}
            onSetCaptionText={captionText => {
              this.setState({ captionText });
            }}
            onSetCaptionOptions={captionOptions => {
              this.setState({ captionOptions });
            }}
            onSetFontSize={fontSize=> {
              this.setState({fontSize});
            }}
            onRenderCaption={() => {
              this.captionRef.capture();
            }}
          />
        );
      default:
        break;
    }
  };

  openPermissions = async() => {
    if (Platform.OS === 'android') {
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.android.package // When published, considered as using standalone build
        : "host.exp.exponent";
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APPLICATION_DETAILS_SETTINGS,
        { data: `package:${pkg}` }
      );
    } else if (Platform.OS === 'ios') {
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.ios.bundleIdentifier // When published, considered as using standalone build
        : "host.exp.exponent";
      Linking.openURL(`app-settings://notification/${pkg}`);
    }
  }
  render() {
    const {
      width,
      height,
      hasPermission,
      type,
      intensity,
      filter,
      renderedNode,
      captionOptions,
      frameOptions,
      fontSize
    } = this.state;

    if (hasPermission === null || hasPermission === false) {
      return (
        <Surface style={{flex:1, alignItems:'center', justifyContent:'space-evenly'}}>
          <Title>No camera access</Title>
          <Text>Grant Camera and Storage access to continue</Text>
          <Button mode="contained" icon="settings" onPress={this.openPermissions}>Open permissions</Button>
        </Surface>
      );
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
            <CaptionRenderBox
              fontSize={fontSize}
              captionOptions={captionOptions}
              frameOptions={frameOptions}
              captionText={this.state.captionText}
              onReadyCapture={this.onReadyCapture}
              style={{ aspectRatio: 1, width, height: width }}
            />
          </ViewShot>
        </View>
        <View style={{ aspectRatio: 1, width, height: width }}>
          <GLSurface
            ref={surface => (this.surface = surface)}
            style={{ aspectRatio: 1, width, height: width }}
          >
            <FX filter={filter} intensity={intensity} overlay={renderedNode} frameOptions={frameOptions}>
              {/* {test80} */}
              <GLCamera
                ref={camera => (this.camera = camera)}
                position={type}
                height={height}
                width={width}
              />
            </FX>
          </GLSurface>

          <FAB
            style={{ position: "absolute", top: 0, right: 0, margin: 20 }}
            small
            icon={`camera-${type === "front" ? "rear" : "front"}`}
            onPress={this.onFlipPress}
          />
          <FAB
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              margin: 10,
              backgroundColor: '#ffffff66'
            }}
            
            color={Colors.amber300}
            size={50}
            onPress={this.onSurfaceCapture}
          />
        </View>
        {this.renderActionPanel()}
      </View>
    );
  }
}

export default withNavigationFocus(HomeScreen);

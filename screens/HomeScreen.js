import { withNavigationFocus } from "@react-navigation/compat";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { Linking } from "expo";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import { Surface as GLSurface } from "gl-react-expo";
import React, { Component } from "react";
import { AppState, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CaptionView } from "../components/CaptionView";
import FilterPicker from "../components/FilterPicker";
import FramePicker from "../components/FramePicker";
import FX from "../components/FX";
import GLCamera from "../components/GLCamera";
import PanView from "../components/PanView";
import filterConsts from "../constants/Filters";
import frameConsts from "../constants/Frames";
import TopAppBar, {
  ACTION_FILTER,
  ACTION_FRAME,
  ACTION_TEXT,
} from "../navigation/AppBar";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: false,
      fxTextOffset: [0, 0],
      hasPermission: null,
      type: "back",
      width: false,
      height: false,
      intensity: 1,
      filter: filterConsts[0],
      frame: frameConsts[0],
      renderedNode: null,
      action: ACTION_FRAME,
      captionText: "",
      captionOptions: {},
      frameOptions: frameConsts[0],
      fontSize: 20,
      appState: AppState.currentState,
    };
    this.camera = null;
    this.unmountedCamera = true;
    this.surface = null;
    this.captionRef = null;
    this.navigationStateListener = null;
  }

  componentDidMount = async () => {
    AppState.addEventListener("change", this._handleAppStateChange);
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({
      hasPermission: status === "granted",
    });
    this.unmountedCamera = false;
  };

  componentWillUnmount() {
    this.camera = null;
    cancelAnimationFrame(this._raf);
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (this.camera && this.camera.camera) {
        this.setState({ camkey: Math.random() });
        // this.camera.camera.resumePreview();
      }
    }
    this.setState({ appState: nextAppState });
  };

  onCameraError = (error) => {
    console.log("onCameraError -> error", error);
  };

  onLayout = (evt) => {
    const { width, height } = evt.nativeEvent.layout;
    this.setState({
      width,
      height: width,
      cameraHeight: height,
    });
  };

  onSelectFilter = (filter) => {
    this.setState({ filter, activeFilterContentTitle: filter.name });
  };
  onSelectFrame = (frame) => {
    this.setState({
      frame,
      frameOptions: frame,
      activeFrameContentTitle: frame.name,
    });
  };

  onFlipPress = () => {
    this.setState({
      camkey: Math.random(),
      type: this.state.type == "front" ? "back" : "front",
    });
  };

  onSurfaceCapture = async () => {
    try {
      if (this.surface) {
        const {
          height,
          localUri,
          uri,
          width,
        } = await this.surface.glView.capture();

        this.props.navigation.navigate("Share", {
          height,
          localUri,
          uri,
          width,
        });
      }
    } catch (error) {
      console.log("HomeScreen -> onSurfaceCapture -> error", error);
    }
  };

  onPauseCamera = (pause) => {
    if (this.camera && this.camera.camera) {
      pause
        ? this.camera.camera.pausePreview()
        : this.camera.camera.resumePreview();
    }
  };
  renderActionPanel = () => {
    switch (this.state.action) {
      case ACTION_FILTER:
        return (
          <FilterPicker
            selectedFilter={this.state.filter}
            onSelectFilter={this.onSelectFilter}
            onSetIntensity={(value) => this.setState({ intensity: value })}
          />
        );
      case ACTION_FRAME:
        return (
          <FramePicker
            selectedFrame={this.state.frame}
            onSelectFrame={this.onSelectFrame}
          />
        );
      case ACTION_TEXT:
        return (
          <CaptionView
            route={this.props.route}
            navigation={this.props.navigation}
            setCaptionSnapshot={(uri) => {
              this.setState({
                renderedNode: { uri: uri.uri },
              });
            }}
            onRotateCaptionSnapshot={(rotateIncrement) => {
              this.setState({ rotateIncrement });
            }}
          />
        );
      default:
        break;
    }
  };

  openPermissions = async () => {
    if (Platform.OS === "android") {
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.android.package // When published, considered as using standalone build
        : "host.exp.exponent";
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APPLICATION_DETAILS_SETTINGS,
        { data: `package:${pkg}` }
      );
    } else if (Platform.OS === "ios") {
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.ios.bundleIdentifier // When published, considered as using standalone build
        : "host.exp.exponent";
      Linking.openURL(`app-settings://notification/${pkg}`);
    }
  };
  onFXDragPosition = (fxTextOffset) => {
    this.setState({ fxTextOffset });
  };

  render() {
    const {
      width,
      height,
      cameraHeight,
      hasPermission,
      type,
      intensity,
      filter,
      renderedNode,
      captionOptions,
      frameOptions,
      fontSize,
      rotateIncrement,
      fxTextOffset,
    } = this.state;

    if (!width && !height) {
      return <Layout style={{ flex: 1 }} onLayout={this.onLayout} />;
    }
    if (hasPermission === null || hasPermission === false) {
      return (
        <Layout
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text category="h1">No camera access</Text>
          <Text>Grant Camera and Storage access to continue</Text>
          <Button
            accessoryLeft={(props) => <Icon {...props} name="settings" />}
            onPress={this.openPermissions}
          >
            Open permissions
          </Button>
        </Layout>
      );
    }

    if (!this.props.navigation.isFocused()) {
      return <Text>Camera delayed rendering</Text>;
    }
    const { params } = this.props.route;
    let imageSource = false;
    if (params && params.imageSource) {
      imageSource = params.imageSource;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopAppBar
          activeContentTitle={this.state.activeContentTitle}
          activeAction={this.state.action}
          activeFilterContentTitle={this.state.filter.name}
          activeFrameContentTitle={this.state.frame.name}
          onAppBarActionButtonPress={(action) => this.setState({ action })}
        />
        <Layout style={{ flex: 1 }} onLayout={this.onLayout}>
          <PanView
            onFXDragPosition={this.onFXDragPosition}
            onPauseFrame={this.onPauseCamera(true)}
            onResumeFrame={this.onPauseCamera(false)}
            style={{ width, height }}
          >
            <GLSurface
              key={this.state.camkey}
              ref={(surface) => (this.surface = surface)}
              style={{ width, height }}
            >
              <FX
                filter={filter}
                intensity={intensity}
                overlay={renderedNode}
                overlayRotate={rotateIncrement}
                frameOptions={frameOptions}
                fxTextOffset={fxTextOffset}
              >
                {!imageSource ? (
                  <GLCamera
                    ref={(camera) => (this.camera = camera)}
                    position={type}
                    height={cameraHeight}
                    width={width}
                    imageSource={imageSource}
                  />
                ) : (
                  { uri: imageSource }
                )}
              </FX>
            </GLSurface>

            {!imageSource && (
              <Button
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: 20,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: "#00000066",
                }}
                accessoryLeft={(props) => (
                  <Icon
                    {...props}
                    name={`camera-${type === "front" ? "rear" : "front"}`}
                  />
                )}
                onPress={this.onFlipPress}
              />
            )}
            <Button
              onPress={this.onSurfaceCapture}
              accessoryLeft={(props) => (
                <Icon {...props} name={`camera-iris`} />
              )}
              style={{
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
                margin: 10,
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: "#00000066",
              }}
            />
          </PanView>
          {this.renderActionPanel()}
        </Layout>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(HomeScreen);

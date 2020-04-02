import React, { Component, useRef, useState, useEffect } from "react";
import {
  ApplicationProvider,
  Layout,
  Text,
  Button
} from "@ui-kitten/components";
import { Camera } from "expo-camera";
import { View } from "react-native";
import {withNavigationFocus} from '@react-navigation/compat'
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { hasPermission: null, type: Camera.Constants.Type.front };
    this.camera = null;
    this.navigationListener = null;
  }

  componentDidMount = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });

    this.navigationListener = this.props.navigation.addListener("blur", e => {
      if (this.camera) {
        console.log("HomeScreen -> componentDidMount -> blur -> e", e)
        this.camera.pausePreview();
      }
    });
    this.navigationListener = this.props.navigation.addListener("focus", e => {
      if (this.camera) {
        console.log("HomeScreen -> componentDidMount -> focus ->e", e)
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

  render() {
    
    console.log("HomeScreen -> render -> this.props.navigation.isFocused();", this.props.navigation.isFocused())
    const { hasPermission, type } = this.state;

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (!this.props.navigation.isFocused()) {
      return <Text>Camera delayed rendering</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ aspectRatio: 1 }}
          type={type}
          ref={camera => (this.camrta = camera)}
          ratio="1:1"
          onMountError={this.onCameraError}
          useCamera2Api
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <Button
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              appearance="ghost"
              onPress={() => {
                this.setState({
                  type:
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              Flip
            </Button>
          </View>
        </Camera>
      </View>
    );
  }
}

export default withNavigationFocus(HomeScreen);

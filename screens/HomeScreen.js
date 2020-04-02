import React, { Component, useRef, useState, useEffect } from "react";
import { ApplicationProvider, Layout, Text, Button } from "@ui-kitten/components";
import { Camera } from "expo-camera";
import { View } from "react-native";


const HomeScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const camera = useRef(null)
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ aspectRatio: 1}}
        type={type}
        ref={camera}
        ratio="1:1"
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
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            Flip
          </Button>
        </View>
      </Camera>
    </View>
  );
}
 
export default HomeScreen;

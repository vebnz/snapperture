import React, { useEffect, useState } from "react";

import { StyleSheet, Image } from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import splash from "../assets/images/g14.png";

import {
  Layout,
  TopNavigation,
  Button,
  Icon,
  ButtonGroup,
  Text,
  Card,
  useTheme,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageManipulator } from "expo-image-crop";

import * as ImagePicker from "expo-image-picker";

const ImageSourceScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const [cropperVisible, setCropperVisible] = useState(false)
  const [imageSource, setImageSource] = useState(false)
  const [croppedPicture, setCroppedPicture] = useState()

  let openImagePickerAsync = async () => {
    setImageSource(false)
    try {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log("openImagePickerAsync -> pickerResult", pickerResult);
      setImageSource(pickerResult.uri);
      navigation.navigate("Cropper", { image: pickerResult });  
    } catch (error) {
      console.log("openImagePickerAsync -> error", error)
      
    }
    
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Image
          source={splash}
          style={{
            width: 300,
            height: 300,
          }}
          resizeMode="contain"
        />
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={styles.card}
            status="primary"
            onPress={() => {
              navigation.navigate("Editor", {
                imageSource: false,
              });
            }}
          >
            <Icon
              name="camera"
              style={{
                color: theme["color-primary-400"],
                alignSelf: "center",
                width: 64,
                height: 64,
              }}
            />
            <Text>Use device camera</Text>
          </Card>
          <Card
            style={styles.card}
            status="success"
            onPress={openImagePickerAsync}
          >
            <Icon
              name="image-search"
              style={{
                color: theme["color-success-400"],
                alignSelf: "center",
                width: 64,
                height: 64,
              }}
            />
            <Text>Select from album</Text>
          </Card>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
});
export default ImageSourceScreen;

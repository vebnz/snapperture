import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageCropper from "../components/ImageCropper";

const BackIcon = (props) => <Icon {...props} name="arrow-left" />;

const CropperScreen = ({ route, navigation }) => {
  const { image } = route.params;
  console.log("CropperScreen -> route.params", route.params)

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => {
      navigation.goBack()
    }} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageCropper
        photo={image}
        isVisible
        onPictureChoosed={(data) => {
          console.log("onPictureChoosed", data.uri)
          navigation.navigate("Editor", {
            imageSource: data.uri
          })
        }}
        // fixedMask={{ width: 100, height: 100 }}
        onToggleModal={()=>{

        }}
        saveOptions={{
          compress: 1,
          format: "png",
          base64: true,
        }}
        btnTexts={{
          done: "Ok",
          crop: "Crop",
          processing: "Processing",
        }}
      />
    </SafeAreaView>
  );
};

export default CropperScreen;

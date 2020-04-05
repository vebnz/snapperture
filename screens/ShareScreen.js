import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
  Colors,
  Appbar,
} from "react-native-paper";
import TopAppBar from "../navigation/AppBar";
import { Image, View } from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from 'expo-media-library';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const ShareScreen = ({ route, navigation }) => {
  if (!route.params) {
    return <Title>No Image</Title>;
  }
  const { height, localUri, uri, width } = route.params;

  const saveToRoll = async () => {
    const { status, permissions } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      return MediaLibrary.saveToLibraryAsync(localUri);
    } else {
      throw new Error("CameraRoll permission not granted");
    }
  }
  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    await saveToRoll()
    Sharing.shareAsync(localUri);
  };

  if (!height || !localUri || !uri || !width) {
    return <Title>No Image</Title>;
  }
  return (
    <Surface style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Share your creation"/>
      </Appbar.Header>
      <Image
        style={{ width: "100%", height: undefined, aspectRatio: 1 }}
        source={{ uri: localUri }}
      />
      <View style={{flexDirection:"row", justifyContent:"space-around"}}>
      <Button
        style={{ margin: 20 }}
        mode="contained"
        icon="share"
        color={Colors.amber900}
        onPress={openShareDialogAsync}
      >
        Share This
      </Button>
      <Button
        style={{ margin: 20 }}
        mode="contained"
        icon="content-save"
        color={Colors.amberA700}
        onPress={saveToRoll}
      >
        Save This
      </Button>
      </View>
    </Surface>
  );
};

export default ShareScreen;

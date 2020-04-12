import React, { useEffect } from 'react';

import { Image, View } from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from 'expo-media-library';
import { Layout, TopNavigation, Button, Icon, ButtonGroup, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShareScreen = ({ route, navigation }) => {
  if (!route.params) {
    return <Text category="h1">No Image</Text>;
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
    return <Text category="h1">No Image</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation alignment="center" title="Share your creation" />
      <Layout style={{ flex: 1 }}>
        <Image
          style={{ flex: 1, resizeMode: "contain" }}
          source={{ uri: localUri }}
        />
        <ButtonGroup style={{ justifyContent: "center" }}>
          <Button
            accessoryLeft={(props) => <Icon {...props} name="share" />}
            accessoryRight={(props) => <Text>Share this...</Text>}
            onPress={openShareDialogAsync}
          />
          <Button
            accessoryLeft={(props) => <Icon {...props} name="content-save" />}
            accessoryRight={(props) => <Text>Save This</Text>}
            status="info"
            onPress={saveToRoll}
          />
        </ButtonGroup>
      </Layout>
    </SafeAreaView>
  );
};

export default ShareScreen;

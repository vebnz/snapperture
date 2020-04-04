import * as React from "react";
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
import { Image } from "react-native";
import * as Sharing from "expo-sharing";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const ShareScreen = ({ route, navigation }) => {
  if (!route.params) {
    return <Title>No Image</Title>;
  }
  const { height, localUri, uri, width } = route.params;

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

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
      <Button
        style={{ margin: 20 }}
        mode="contained"
        icon="share"
        color={Colors.amber900}
        onPress={openShareDialogAsync}
      >
        Share This
      </Button>
    </Surface>
  );
};

export default ShareScreen;

import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph, Surface } from "react-native-paper";
import TopAppBar from "../navigation/AppBar";
import { Image } from "react-native";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const ShareScreen = ({ route, navigation }) => {
  if (!route.params) {
    return <Title>No Image</Title>;
  }
  const { height, localUri, uri, width } = route.params;

  if (!height || !localUri || !uri || !width) {
    return <Title>No Image</Title>;
  }
  return (
    <Surface style={{ flex: 1 }}>
      <TopAppBar />
      <Image
        style={{ width: '100%', height: undefined, aspectRatio:1 }}
        source={{ uri: localUri }}
      />
    </Surface>
  );
};

export default ShareScreen;

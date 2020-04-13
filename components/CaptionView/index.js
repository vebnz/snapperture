import React, { useState, useEffect } from "react";

import { View, StatusBar, ScrollView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import { captureRef } from "react-native-view-shot";
import {
  Text,
  Modal,
  Input,
  Button,
  Icon,
  ButtonGroup,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";

export const FontList = [
  { fontFamily: "avantquelombre", name: "Avant" },
  { fontFamily: "BebasNeue", name: "Bebas" },
  { fontFamily: "BondoluoPeek", name: "Bondoluo" },
  { fontFamily: "Brain", name: "Brain Flower" },
  { fontFamily: "Christians", name: "Brush" },
  { fontFamily: "daniel", name: "Daniel" },
  { fontFamily: "edosz", name: "Edo" },
  { fontFamily: "fashionistafree", name: "Fashionista" },
  { fontFamily: "OneDirection", name: "One Direction" },
  { fontFamily: "SF", name: "SF" },
  { fontFamily: "Signerica_Medium", name: "Signerica" },
  { fontFamily: "Silent", name: "Silent Script" },
  { fontFamily: "Sunshine", name: "Sunshine" },
  { fontFamily: "Sweetly", name: "Sweetly" },

  { fontFamily: "HomemadeApple", name: "Homemade Apple" },
  { fontFamily: "Lobster", name: "Lobster" },
  { fontFamily: "MrsSaintDelafield", name: "Saint Script" },
  { fontFamily: "PermanentMarker", name: "Marker" },
  { fontFamily: "Playball", name: "Playball" },
  { fontFamily: "PressStart2P", name: "Arcade" },
  { fontFamily: "RipeApricots", name: "Apricots" },
  { fontFamily: "RockSalt", name: "Rock Salt" },
  { fontFamily: "CodyStar", name: "LED Board" },
];
const CaptionView = (props) => {
  const [captionText, setCaptionText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fontSize, setFontSize] = useState(30);
  const [captionFont, setCaptionFont] = useState(FontList[0].fontFamily);

  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    if (props.route.params?.renderedCaption) {
      props.setCaptionSnapshot(props.route.params?.renderedCaption);
    }
  }, [props.route.params?.renderedCaption])

  const rotateText = increment => {
    const rotateIncrement = rotate + increment;
    setRotate(rotateIncrement);
    props.onRotateCaptionSnapshot(rotateIncrement)
  }
  return (
    <Layout
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View>
        <Text></Text>
        <ButtonGroup style={{ justifyContent: "center" }}>

        <Button
          appearance="filled"
          onPress={() => {
            props.navigation.navigate("Caption");
          }}
          accessoryRight={(props) => (
            <Text status="control">{"Edit caption"}</Text>
          )}
          accessoryLeft={(icoprops) => <Icon {...icoprops} name="pencil" />}
        />
        </ButtonGroup>
      </View>
      <View style={{alignItems:"center"}}>
        <Text>Rotate</Text>
        <ButtonGroup style={{ justifyContent: "center" }}>
          <Button
            accessoryLeft={(props) => (
              <Icon {...props} name="rotate-left-variant" />
            )}
            onPress={() => rotateText(+Math.PI / 2)}
          />
          <Button
            accessoryLeft={(props) => (
              <Icon {...props} name="rotate-right-variant" />
            )}
            onPress={() => rotateText(-Math.PI / 2)}
          />
        </ButtonGroup>
      </View>
    </Layout>
  );
};
CaptionView.defaultProps = {
  captionText: false,
};

export { CaptionView };

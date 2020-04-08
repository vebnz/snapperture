import React, { useState, useEffect } from "react";
import {
  Surface,
  Title,
  TextInput,
  IconButton,
  Colors,
  Text,
  Portal,
  Modal,
  Button,
  ToggleButton,
  FAB,
} from "react-native-paper";
import { View, StatusBar, ScrollView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import { captureRef } from "react-native-view-shot";

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
];
const CaptionView = (props) => {
  const [captionText, setCaptionText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fontSize, setFontSize] = useState(30);
  const [captionFont, setCaptionFont] = useState(FontList[0].fontFamily)

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCaptionFont(item.fontFamily)
          // props.onSetCaptionOptions({
          //   fontFamily: item.fontFamily,
          // });
        }}
      >
        <Surface
          style={{
            backgroundColor: Colors.white,
            width: 120,
            height: 80,
            paddingRight: 5,
            paddingLeft: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: item.fontFamily,
              textAlign: "center",
              alignSelf: "center",
              color: Colors.black,
            }}
          >
            {item.name}
          </Text>
        </Surface>
      </TouchableOpacity>
    );
  };

  return (
    <Surface style={{ flex: 1, justifyContent: "flex-start" }}>
      <Title style={{ textAlign: "center" }}>Caption</Title>
      <View style={{ flexDirection: "row" }}>
        <Portal>
          <Modal
            contentContainerStyle={{ flex: 1, justifyContent: "flex-start" }}
            visible={showModal}
            dismissable={false}
            // onDismiss={() => setShowModal(false)}
          >
            <ScrollView style={{ padding: 10, marginTop: 56 + Constants.statusBarHeight }}>
              <Text
                style={{
                  fontSize: fontSize,
                  fontFamily: captionFont,
                  includeFontPadding: true,
                  textAlignVertical: "center",
                  padding: 10,
                  color: Colors.white,
                }}
              >
                {captionText}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TextInput
                  autoFocus
                  style={{ flex: 1 }}
                  label="Caption"
                  value={captionText || props.captionText}
                  onChangeText={(text) => {
                    setCaptionText(text);
                  }}
                  onSubmitEditing={() => {
                    // props.onRenderCaption();
                  }}
                />
                <Button
                  icon="keyboard-return"
                  color={Colors.deepOrange400}
                  mode="contained"
                  onPress={() => {
                    setShowModal(false);
                    props.cameraPause(false);
                  }}
                />
              </View>
              <FlatList
                horizontal
                data={FontList}
                renderItem={renderItem}
                keyExtractor={(item) => item.fontFamily}
              />
              <Surface
                style={{ justifyContent: "space-around", flexDirection: "row" }}
              >
                <FAB
                  icon="format-font-size-decrease"
                  onPress={() => setFontSize(14)}
                />
                <FAB icon="format-color-text" onPress={() => setFontSize(20)} />
                <FAB
                  icon="format-font-size-increase"
                  onPress={() => setFontSize(30)}
                />
              </Surface>
            </ScrollView>
          </Modal>
        </Portal>
        <Button
          style={{ flex: 1, margin: 20 }}
          uppercase={false}
          dark={false}
          color={Colors.deepOrange400}
          mode="contained"
          onPress={() => {
            setShowModal(true);
            props.cameraPause(true);
          }}
        >
          {props.captionText || "Add caption..."}
        </Button>
      </View>
    </Surface>
  );
};
CaptionView.defaultProps = {
  captionText: "Add caption...",
};

const CaptionRenderBox = (props) => {
  
  const captureBox = React.useRef();

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const viewShotRender = async (time) => {
    console.log("time", time);
    
    try {
      let result = await captureRef(captureBox, {
        format: "png",
      });
      console.log("onSnap -> result", result)
      props.setCaptionSnapshot(result)
    } catch (error) {
      console.log("onSnap -> error", error)
    }
  };

  const snapAsync = async () => {
    try {
      let result = await captureRef(captureBox, {
        format: "png",
      });
      console.log("onSnap -> result", result);
      props.setCaptionSnapshot(result);
    } catch (error) {
      console.log("onSnap -> error", error);
    }
  }
  
  useEffect(() => {
    snapAsync()
  }, [
    props.fontSize,
    props.captionOptions,
    props.frameOptions,
    props.captionText,
  ]);

  useEffect(() => {
    snapAsync();
  }, []);

  return (
    <View style={props.style}>
      <View style={{ ...props.frameOptions.viewFrameStyle }}>
        <Text
          ref={captureBox}
          style={{
            ...props.frameOptions.textFrameStyle,
            fontSize: props.fontSize,
            fontFamily: props.captionOptions.fontFamily,
            includeFontPadding: true,
            textAlignVertical: "center",
            padding: 10,
          }}
        >
          {props.captionText}
        </Text>
      </View>
    </View>
  );
};

CaptionRenderBox.defaultProps = {
  color: Colors.black,
  fontFamily: "edosz",
  captionText:"CAPTAIN FACTION"
}

export { CaptionView, CaptionRenderBox };

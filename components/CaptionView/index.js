import React, { useState, useEffect } from "react";

import { View, StatusBar, ScrollView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import { captureRef } from "react-native-view-shot";
import { Text, Modal, Input, Button, Icon, ButtonGroup, Layout } from "@ui-kitten/components";

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
        <View
          style={{
            backgroundColor: '#ffffff',
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
              color: '#000000',
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "flex-start" }}>
      <View style={{ flexDirection: "row" }}>
        <Modal
          contentContainerStyle={{ flex: 1, justifyContent: "flex-start" }}
          visible={showModal}
          dismissable={false}
          // onDismiss={() => setShowModal(false)}
        >
          <ScrollView
            style={{ padding: 10, marginTop: 56 + Constants.statusBarHeight }}
          >
            <Text
              style={{
                fontSize: fontSize,
                fontFamily: captionFont,
                includeFontPadding: true,
                textAlignVertical: "center",
                padding: 10,
                color: "#ffffff",
              }}
            >
              {captionText}
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Input
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
                accessoryLeft={(props) => (
                  <Icon {...props} name="keyboard-return" />
                )}
                status="primary"
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
            <ButtonGroup appearance="filled">
              <Button
                accessoryLeft={(props) => (
                  <Icon {...props} name="format-font-size-decrease" />
                )}
                onPress={() => setFontSize(14)}
              />
              <Button
                accessoryLeft={(props) => (
                  <Icon {...props} name="format-color-text" />
                )}
                onPress={() => setFontSize(20)}
              />
              <Button
                accessoryLeft={(props) => (
                  <Icon {...props} name="format-font-size-increase" />
                )}
                onPress={() => setFontSize(30)}
              />
            </ButtonGroup>
          </ScrollView>
        </Modal>
        <View style={{ flex: 1 }}>
          <Button
            textStyle={{ fontFamily: "Quicksand" }}
            appearance="filled"
            style={{ fontFamily: 'Quicksand', alignSelf: "center" }}
            onPress={() => {
              setShowModal(true);
              props.cameraPause(true);
            }}
            accessoryRight={(props) => <Text>{captionText || "Add caption"}</Text>}
            accessoryLeft={(icoprops) => <Icon {...icoprops} name={`${captionText?'pencil':'plus'}`}/>}
          />            
        </View>
      </View>
    </Layout>
  );
};
CaptionView.defaultProps = {
  captionText: false,
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
  color: '#000000',
  fontFamily: "edosz",
  captionText:"CAPTAIN FACTION"
}

export { CaptionView, CaptionRenderBox };

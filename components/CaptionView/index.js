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
import { View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onSetCaptionOptions({
            fontFamily: item.fontFamily,
          });
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
            contentContainerStyle={{ opacity: 1 }}
            visible={showModal}
            dismissable={false}
            // onDismiss={() => setShowModal(false)}
          >
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1 }}
                label="Caption"
                value={captionText || props.captionText}
                onChangeText={(text) => {
                  setCaptionText(text);
                  props.onSetCaptionText(text);
                }}
                onSubmitEditing={() => {
                  // props.onRenderCaption();
                }}
              />
              <IconButton
                icon="keyboard-return"
                color={Colors.deepOrange400}
                size={30}
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
            <Surface style={{ justifyContent:'space-around',flexDirection: "row" }}>
              <FAB
                icon="format-font-size-decrease"
                onPress={() => props.onSetFontSize(14)}
              />
              <FAB
                icon="format-color-text"
                onPress={() => props.onSetFontSize(20)}
              />
              <FAB
                icon="format-font-size-increase"
                onPress={() => props.onSetFontSize(30)}
              />
            </Surface>
          </Modal>
        </Portal>
        <Button
          style={{ flex: 1, marginBottom: 20, marginTop: 20 }}
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
  const captionOptions = { ...defaultCaptionOptions, ...props.captionOptions };
  const frameOptions = { ...defaultFrameOptions, ...props.frameOptions };

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const viewShotRender = (time) => {
    console.log("time", time);
    props.onReadyCapture();
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(viewShotRender);
    return () => cancelAnimationFrame(requestRef.current);
  }, [props.fontSize, props.captionOptions, props.frameOptions, props.captionText]);

  return (
    <View style={props.style}>
      <View style={{...props.frameOptions.viewFrameStyle}}>
        <Title
          style={{
            ...props.frameOptions.textFrameStyle,
            fontSize: props.fontSize,
            fontFamily: captionOptions.fontFamily,
            includeFontPadding: true,
            textAlignVertical: 'center',
            padding:10
          }}
        >
          {props.captionText}
        </Title>
      </View>
    </View>
  );
};

const defaultFrameOptions = {
  backgroundColor: Colors.white,
};

const defaultCaptionOptions = {
  color: Colors.black,
  fontFamily: "edosz",
};

export { CaptionView, CaptionRenderBox };

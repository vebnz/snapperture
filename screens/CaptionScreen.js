import {
  Button,
  ButtonGroup,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import React, { useState, useRef } from "react";
import { FlatList, ScrollView, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontList } from "../components/CaptionView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { captureRef } from "react-native-view-shot";

const BackIcon = (props) => <Icon {...props} name="arrow-left" />;

export const CaptionScreen = (props) => {
  console.log("CaptionScreen -> props", props);
  const [captionText, setCaptionText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fontSize, setFontSize] = useState(30);
  const [captionFont, setCaptionFont] = useState(FontList[0].fontFamily);

  const textRenderTarget = useRef();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCaptionFont(item.fontFamily);
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
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
              color: "#000000",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateBack = async () => {
    await snapTarget();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const snapTarget = async () => {
    let renderedCaption = null;
    try {
      renderedCaption = await captureRef(textRenderTarget, {
        format: "png",
      });
      console.log("onSnap -> renderedCaption", renderedCaption);
    } catch (error) {
      console.log("onSnap -> error", error);
    }
    props.navigation.navigate("Camera", {
      renderedCaption: { 
        uri: renderedCaption,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Edit caption"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <Text
            ref={textRenderTarget}
            style={{
              fontSize: fontSize,
              fontFamily: captionFont,
              includeFontPadding: true,
              textAlignVertical: "center",
              padding: 10,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {captionText}
          </Text>
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
          <FlatList
            horizontal
            data={FontList}
            renderItem={renderItem}
            keyExtractor={(item) => item.fontFamily}
          />
          <ButtonGroup style={{ justifyContent: "center" }} appearance="filled">
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
          <Button
            accessoryLeft={(props) => (
              <Icon {...props} name="keyboard-return" />
            )}
            accessoryRight={(props) => <Text>Apply Caption</Text>}
            status="primary"
            onPress={() => {
              snapTarget();
            }}
          />
        </KeyboardAwareScrollView>
      </Layout>
    </SafeAreaView>
  );
};

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
import React, { useState, useRef } from "react";
import { FlatList, ScrollView, View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontList } from "../components/CaptionView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { captureRef } from "react-native-view-shot";
import { useColorScheme } from "react-native-appearance";


const BackIcon = (props) => <Icon {...props} name="arrow-left" />;

export const CaptionScreen = (props) => {
  const [captionText, setCaptionText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fontSize, setFontSize] = useState(30);
  const [captionFont, setCaptionFont] = useState(FontList[0].fontFamily);

  const textRenderTarget = useRef();

  const colorScheme = useColorScheme();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCaptionFont(item.fontFamily);
        }}
      >
        <View
          style={{
            backgroundColor: colorScheme === "light" ? "#000000" : "#ffffff",
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
              color: colorScheme === "light" ? "#ffffff" : "#000000",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => {
      console.log("navigateBack -> props.navigation", props.navigation)
      props.navigation.goBack();
    }} />
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
    props.navigation.navigate("Editor", {
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
      <Text
        ref={textRenderTarget}
        style={{
          position: "absolute",
          height: Dimensions.get("window").width,
          width: Dimensions.get("window").width,
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
      <Layout style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <Text
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

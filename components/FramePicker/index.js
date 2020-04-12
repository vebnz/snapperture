import React, { useState, useEffect } from "react";

import frameConsts from "../../constants/Frames";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image, View, Slider } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { ThemedFrameGrid } from "./FrameGrid";

const FramePicker = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(frameConsts[0]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const renderSelectedFrame = () => {
    return (
      <View style={{alignItems:"center"}}>
        <Text style={{ paddingTop: 0, textAlign: "center" }}>
          Pick Frame
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(true);
          }}
        >
          <View
            style={{
              backgroundColor: "#212121",
              width: 80,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={props.selectedFrame.cropMask}
              style={{
                transform: [{ rotate: props.selectedFrame.imgRotate }],
                width: 80,
                height: 80,
              }}
            />
            <Text
              style={{
                width: 80,
                fontSize: 12,
                backgroundColor: "#212121",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              {props.selectedFrame.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Layout style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {renderSelectedFrame()}
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text style={{ paddingTop: 0, textAlign: "center" }}>Opacity</Text>
          <Slider
            step={0.1}
            style={{ margin: 10 }}
            value={1}
            minimumValue={0.0}
            maximumValue={1.0}
            onValueChange={(value) => {props.onSetOpacity(value)}}
          />
        </View>
      </View>
      <ThemedFrameGrid
        showFilterModal={showFilterModal}
        onSelectFrame={(item) => {
          setSelectedFrame(item);
          props.onSelectFrame(item);
          setShowFilterModal(false);
        }}
      />
    </Layout>
  );
};

FramePicker.defaultProps = {
  selectedFrame: frameConsts[0]
};
export default FramePicker;

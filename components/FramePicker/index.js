import React, { useState } from "react";

import frameConsts from "../../constants/Frames";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View, Slider } from "react-native";
import { Text, Layout } from "@ui-kitten/components";


const FramePicker = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(frameConsts[0]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFrame(item);
          props.onSelectFrame(item);
        }}
      >
        <View style={{ paddingRight: 5, paddingLeft: 5 }}>
          <Image tintColor={"#ffffff"} source={item.cropMask} style={{ transform:[{rotate: item.imgRotate}], width: 50, height: 50 }} />
          <Text
            style={{
              fontSize: 12,
              backgroundColor: "#212121",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Layout style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text category="h3" style={{ flex: 1, textAlign: "center" }}>
        {selectedFrame.name}
      </Text>
      <FlatList
        horizontal
        data={frameConsts}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
      />
    </Layout>
  );
};

export default FramePicker;

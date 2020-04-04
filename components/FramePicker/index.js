import React, { useState } from "react";
import { Menu, Button, Title, Colors, Text, Surface } from "react-native-paper";
import frameConsts from "../../constants/Frames";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View, Slider } from "react-native";


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
          <Image tintColor={Colors.white} source={item.cropMask} style={{ transform:[{rotate: item.imgRotate}], width: 50, height: 50 }} />
          <Text
            style={{
              fontSize: 12,
              backgroundColor: Colors.grey900,
              textAlign: "center",
              color: Colors.white,
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Surface style={{ flex: 1, justifyContent: "flex-end" }}>
      <Title style={{ flex: 1, textAlign: "center" }}>
        {selectedFrame.name}
      </Title>
      <FlatList
        horizontal
        data={frameConsts}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
      />
    </Surface>
  );
};

export default FramePicker;

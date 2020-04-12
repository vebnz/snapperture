import React from "react";
import { View, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { Text, withStyles, Layout } from "@ui-kitten/components";
import frameConsts from "../../constants/Frames";

const FrameGrid = (props) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onSelectFrame(item);
        }}
      >
        <View
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            width: 100,
            backgroundColor: "#212121",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={item.cropMask}
            resizeMode="contain"
            style={{
              width: 90,
              height: 90,
              transform: [{ rotate: item.imgRotate }],
            }}
          />
          <Text
            style={{
              width: 100,
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

  console.log("props.eva.style.mStyle", props.eva.style.mStyle);
  return (
    <Modal
      hardwareAccelerated
      animationType="slide"
      transparent={false}
      visible={props.showFilterModal}
    >
      <View style={props.eva.style.mStyle}>
        <Text category="h5">Select frame...</Text>
        <FlatList
          data={frameConsts}
          renderItem={renderItem}
          keyExtractor={(item) => item.value}
          numColumns={3}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
};

FrameGrid.defaultProps = {
  showFilterModal: false,
};

export const ThemedFrameGrid = withStyles(FrameGrid, (theme) => ({
  mStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme["background-basic-color-1"],
  },
}));

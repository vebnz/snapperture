import React from "react";
import { View, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { Text, withStyles, Layout } from "@ui-kitten/components";
import filterConsts from "../../constants/Filters";

const FilterGrid = (props) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onSelectFilter(item);
        }}
      >
        <View
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            width: 100,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={item.preview}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
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

  return (
    <Modal
      hardwareAccelerated
      animationType="slide"
      transparent={false}
      visible={props.showFilterModal}
    >
      <View style={props.eva.style.mStyle}>
        <Text category="h5">Select filter...</Text>
        <FlatList
          data={filterConsts}
          renderItem={renderItem}
          keyExtractor={(item) => item.value}
          numColumns={3}
          style={{ flex: 1 }}
        />
      </View>
    </Modal>
  );
};

FilterGrid.defaultProps = {
  showFilterModal: false,
};

export const ThemedFilterGrid = withStyles(FilterGrid, (theme) => ({
  mStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme["background-basic-color-1"],
  },
}));

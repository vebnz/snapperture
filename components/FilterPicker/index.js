import React, { useState } from "react";
import { Menu, Button, Title, Colors, Text } from "react-native-paper";
import filterConsts from "../../constants/Filters";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View } from "react-native";
import { Surface as GLSurface } from "gl-react-expo";

const FilterPicker = props => {
  const renderItem = ({ item }) => {
    console.log("item", item);
    return (
      <TouchableOpacity onPress={() => props.onSelectFilter(item)}>
        <Image source={item.preview} style={{ width: 80, height: 80 }} />
        <Text
          style={{
            position: "absolute",
            top: 10,
            textAlign: "center",
            color: Colors.white
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      horizontal
      data={filterConsts}
      renderItem={renderItem}
      keyExtractor={item => item.value}
    />
  );
};

export default FilterPicker;

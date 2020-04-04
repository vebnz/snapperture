import React, { useState } from "react";
import { Menu, Button, Title, Colors, Text, Surface } from "react-native-paper";
import filterConsts from "../../constants/Filters";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View, Slider } from "react-native";
import { Surface as GLSurface } from "gl-react-expo";

const FilterPicker = props => {
  const [selectedFilter, setSelectedFilter] = useState(filterConsts[0])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        setSelectedFilter(item)
        props.onSelectFilter(item)
      }}>
        <View style={{paddingRight: 5, paddingLeft:5}}>
          <Image source={item.preview} style={{ width: 75, height: 75 }} />
          <Text
            style={{
              fontSize:12,
              backgroundColor: Colors.grey900,
              textAlign: "center",
              color: Colors.white
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
        {selectedFilter.name}
      </Title>
      <FlatList
        horizontal
        data={filterConsts}
        renderItem={renderItem}
        keyExtractor={item => item.value}
      />
      <Text style={{ paddingTop: 10, textAlign: "center" }}>
        Filter Intensity
      </Text>
      <Slider
        style={{ height: 40 }}
        value={1}
        minimumValue={0}
        maximumValue={1.25}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#ff0000"
        onValueChange={value => props.onSetIntensity(value)}
      />
    </Surface>
  );
};

export default FilterPicker;

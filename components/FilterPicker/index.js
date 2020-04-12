import React, { useState } from "react";
import filterConsts from "../../constants/Filters";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View, Slider } from "react-native";
import { Surface as GLSurface } from "gl-react-expo";
import { Text, Layout } from "@ui-kitten/components";

const FilterPicker = props => {
  const [selectedFilter, setSelectedFilter] = useState(filterConsts[0])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFilter(item);
          props.onSelectFilter(item);
        }}
      >
        <View style={{ paddingRight: 5, paddingLeft: 5, width: 100, alignContent:'center', justifyContent:'center' }}>
          <Image source={item.preview} style={{ width: 100, height: 50 }} />
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
    <Layout style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text category="h3" style={{ flex: 1, textAlign: "center" }}>
        {selectedFilter.name}
      </Text>
      <FlatList
        horizontal
        data={filterConsts}
        renderItem={renderItem}
        keyExtractor={item => item.value}
      />
      <Text style={{ paddingTop: 0, textAlign: "center" }}>
        Filter Intensity
      </Text>
      <Slider
        step={.05}
        style={{ height: 40, marginBottom: 10 }}
        value={1}
        minimumValue={0}
        maximumValue={1.25}
        onValueChange={value => {
          props.onSetIntensity(value)
        }}
      />
    </Layout>
  );
};

export default FilterPicker;

import React, { useState, useEffect } from "react";
import filterConsts from "../../constants/Filters";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View, Slider } from "react-native";
import { Surface as GLSurface } from "gl-react-expo";
import { Text, Layout } from "@ui-kitten/components";
import {ThemedFilterGrid} from "./FilterGrid";

const FilterPicker = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(filterConsts[0]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    setSelectedFilter(filterConsts[0]);
    props.onSelectFilter(filterConsts[0]);
  }, [])

  const renderItem = ({ item }) => {
    if (item.value === "more") {
      return (
        <TouchableOpacity onPress={() => {setShowFilterModal(true)}}>
          <View
            style={{
              paddingRight: 5,
              paddingLeft: 5,
              height: 50,
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#212121",
            }}
          >
            <Text
              style={{
                width: 100,
                fontSize: 12,
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              More filters...
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedFilter(item);
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
      <FlatList
        horizontal
        data={[
          ...filterConsts.slice(0, 6),
          {
            value: "more",
          },
        ]}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
      />
      <Text style={{ paddingTop: 0, textAlign: "center" }}>
        Filter Intensity
      </Text>
      <Slider
        step={0.05}
        style={{ margin: 10 }}
        value={1}
        minimumValue={0}
        maximumValue={1.25}
        onValueChange={(value) => {
          props.onSetIntensity(value);
        }}
      />
      <ThemedFilterGrid
        showFilterModal={showFilterModal}
        onSelectFilter={(item) => {
          setSelectedFilter(item);
          props.onSelectFilter(item);
          setShowFilterModal(false);
        }}
      />
    </Layout>
  );
};

export default FilterPicker;

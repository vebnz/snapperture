import React, { useState, useEffect } from "react";
import filterConsts from "../../constants/Filters";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FX from "../FX";
import { Image, View, Slider } from "react-native";
import { Surface as GLSurface } from "gl-react-expo";
import { Text, Layout } from "@ui-kitten/components";
import { ThemedFilterGrid } from "./FilterGrid";

const FilterPicker = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(filterConsts[0]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const renderSelectedFilter = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ paddingTop: 0, textAlign: "center" }}>
          Pick Filter
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(true);
          }}
        >
          <View
            style={{
              width: 80,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={props.selectedFilter.preview}
              style={{ width: 80, height: 80 }}
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
              {props.selectedFilter.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Layout style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {renderSelectedFilter()}
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text style={{ paddingTop: 0, textAlign: "center" }}>
            Filter Intensity
          </Text>
          <Slider
            step={0.05}
            style={{ margin: 10 }}
            value={props.intensity}
            minimumValue={0}
            maximumValue={1.25}
            onValueChange={(value) => {
              props.onSetIntensity(value);
            }}
          />
        </View>
      </View>
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

FilterPicker.defaultProps = {
  selectedFilter: filterConsts[0]
}
export default FilterPicker;

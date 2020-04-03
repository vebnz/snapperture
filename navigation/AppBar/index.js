import React from "react";
import { Appbar } from "react-native-paper";
const TopAppBar = props => {
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="image-filter-black-white"
        onPress={() => props.onButtonPress("filter")}
      />
      <Appbar.Action
        icon="format-textbox"
        onPress={() => props.onButtonPress("text")}
      />
      <Appbar.Action
        icon="image-filter-frames"
        onPress={() => props.onButtonPress("frame")}
      />
    </Appbar.Header>
  );
};

export default TopAppBar;

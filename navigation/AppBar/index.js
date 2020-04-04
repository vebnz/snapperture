import React from "react";
import { Appbar, Colors } from "react-native-paper";

export const ACTION_FILTER="ACTION_FILTER";
export const ACTION_TEXT="ACTION_TEXT";
export const ACTION_FRAME="ACTION_FRAME";

const TopAppBar = props => {
  const selectedStyle = { backgroundColor: Colors.amber900 };

  return (
    <Appbar.Header>
      <Appbar.Action
        icon="image-filter-black-white"
        onPress={() => props.onAppBarActionButtonPress(ACTION_FILTER)}
        style={props.activeAction === ACTION_FILTER?selectedStyle:{}}
      />
      <Appbar.Action
        icon="format-textbox"
        onPress={() => props.onAppBarActionButtonPress(ACTION_TEXT)}
        style={props.activeAction === ACTION_TEXT?selectedStyle:{}}
      />
      <Appbar.Action
        icon="image-filter-frames"
        onPress={() => props.onAppBarActionButtonPress(ACTION_FRAME)}
        style={props.activeAction === ACTION_FRAME?selectedStyle:{}}
      />
    </Appbar.Header>
  );
};

TopAppBar.defaultProps = {
  activeAction: 'filter'
};
export default TopAppBar;

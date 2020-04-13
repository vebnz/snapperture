import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Image } from "react-native";
import { useColorScheme } from "react-native-appearance";

export const ACTION_FILTER = "ACTION_FILTER";
export const ACTION_TEXT = "ACTION_TEXT";
export const ACTION_FRAME = "ACTION_FRAME";

import splashLight from "../../assets/images/logolight.png";
import splashDark from "../../assets/images/logodark.png";

const TopAppBar = (props) => {
  const colorScheme = useColorScheme();

  const splash = colorScheme === "light" ? splashDark : splashLight;

  const [currentAction, setCurrentAction] = useState("Filters");
  const renderToolbar = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={(props) => <Icon {...props} name="image-filter-black-white" />}
        appearance={
          props.activeAction === ACTION_FILTER ? "default" : "control"
        }
        onPress={() => {
          setCurrentAction("Filters");
          props.onAppBarActionButtonPress(ACTION_FILTER);
        }}
      />
      <TopNavigationAction
        icon={(props) => <Icon {...props} name="format-textbox" />}
        appearance={props.activeAction === ACTION_TEXT ? "default" : "control"}
        onPress={() => {
          setCurrentAction("Captions");
          props.onAppBarActionButtonPress(ACTION_TEXT);
        }}
      />
      <TopNavigationAction
        icon={(props) => <Icon {...props} name="image-filter-frames" />}
        appearance={props.activeAction === ACTION_FRAME ? "default" : "control"}
        onPress={() => {
          setCurrentAction("Frames");
          props.onAppBarActionButtonPress(ACTION_FRAME);
        }}
      />
    </React.Fragment>
  );

  let activeContentTitle = "";
  switch (props.activeAction) {
    case ACTION_FILTER:
      activeContentTitle = props.activeFilterContentTitle;
      break;
    case ACTION_FRAME:
      activeContentTitle = props.activeFrameContentTitle;
      break;
    default:
      activeContentTitle = "";
      break;
  }

  return (
    <TopNavigation
      appearance="default"
      alignment="center"
      title={activeContentTitle}
      subtitle={currentAction}
      accessoryRight={renderToolbar}
      accessoryLeft={(props) => (
        <Image {...props} source={splash} style={{ height: 40, width: 40 }} 
          resizeMode="contain"
        />
      )}
    />
  );
};

TopAppBar.defaultProps = {
  activeAction: "filter",
};
export default TopAppBar;

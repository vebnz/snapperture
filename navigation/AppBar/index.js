import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

export const ACTION_FILTER = "ACTION_FILTER";
export const ACTION_TEXT = "ACTION_TEXT";
export const ACTION_FRAME = "ACTION_FRAME";

const TopAppBar = (props) => {
  console.log("TopAppBar -> props", props);
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
    />
  );
  return (
    <Layout
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {/* <ButtonGroup style={{justifyContent:"center"}}> */}
      <Button
        appearance="ghost"
        accessoryLeft={(props) => (
          <Icon {...props} name="image-filter-black-white" />
        )}
        status={props.activeAction === ACTION_FILTER ? "primary" : "basic"}
        onPress={() => {
          setCurrentAction("Filters");
          props.onAppBarActionButtonPress(ACTION_FILTER);
        }}
      />
      <Button
        appearance="ghost"
        accessoryLeft={(props) => <Icon {...props} name="format-textbox" />}
        status={props.activeAction === ACTION_TEXT ? "primary" : "basic"}
        onPress={() => {
          setCurrentAction("Captions");
          props.onAppBarActionButtonPress(ACTION_TEXT);
        }}
      />
      <Button
        appearance="ghost"
        accessoryLeft={(props) => (
          <Icon {...props} name="image-filter-frames" />
        )}
        status={props.activeAction === ACTION_FRAME ? "primary" : "basic"}
        onPress={() => {
          setCurrentAction("Frames");
          props.onAppBarActionButtonPress(ACTION_FRAME);
        }}
      />
      {/* </ButtonGroup> */}
    </Layout>
  );
};

TopAppBar.defaultProps = {
  activeAction: "filter",
};
export default TopAppBar;

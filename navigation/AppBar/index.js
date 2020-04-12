import React, { useState } from "react";
import { ButtonGroup, Button, Icon, Layout } from "@ui-kitten/components";

export const ACTION_FILTER = "ACTION_FILTER";
export const ACTION_TEXT = "ACTION_TEXT";
export const ACTION_FRAME = "ACTION_FRAME";

const TopAppBar = (props) => {
  const [currentAction, setCurrentAction] = useState("Filters");
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
        status={props.activeAction === ACTION_FILTER?"primary":"basic"}
        
        onPress={() => {
          setCurrentAction("Filters");
          props.onAppBarActionButtonPress(ACTION_FILTER);
        }}
      />
      <Button
        appearance="ghost"
        accessoryLeft={(props) => <Icon {...props} name="format-textbox" />}
        status={props.activeAction === ACTION_TEXT?"primary":"basic"}
        
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
        status={props.activeAction === ACTION_FRAME?"primary":"basic"}
        
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

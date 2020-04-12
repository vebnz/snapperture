import OverlayNode from "./OverlayNode";
import BaseFilter from "./BaseFilter";
import React from "react";

const FX = (props) => {
  return (
  <OverlayNode {...props}>
    <BaseFilter {...props}>
      {props.children}
    </BaseFilter>
  </OverlayNode>
  )
};

export default FX;

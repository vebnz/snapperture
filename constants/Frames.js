export const BLANK_FRAME = "BLANK_FRAME";
export const CENTER_FRAME = "CENTER_FRAME";
export const CIRCLE_FRAME = "CIRCLE_FRAME";
export const TWOSIDE_LANDSCAPE_FRAME = "TWOSIDE_LANDSCAPE_FRAME";
export const TWOSIDE_PORTRAIT_FRAME = "TWOSIDE_PORTRAIT_FRAME";
export const LEFT_FRAME = "LEFT_FRAME";
export const RIGHT_FRAME = "RIGHT_FRAME";
export const TOP_FRAME = "TOP_FRAME";
export const BOTTOM_FRAME = "BOTTOM_FRAME";

import BLANK_FRAME_SRC from "../assets/masks/blank.png";
import CENTER_FRAME_SRC from "../assets/masks/center.png";
import CIRCLE_FRAME_SRC from "../assets/masks/circle.png";
import LANDSCAPE_FRAME_SRC from "../assets/masks/landscape.png";
import PORTRAIT_FRAME_SRC from "../assets/masks/portrait.png";
import { Colors } from "react-native-paper";

const textShadow = {
  
}

const frameConsts = [
  {
    name: "Blank",
    imgRotate: "0deg",
    rotate: 0,
    overlayRotate: 0,
    value: BLANK_FRAME,
    cropMask: BLANK_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      bottom: 0,
      minHeight: 135,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.white,
    },
  },
  {
    name: "Center",
    imgRotate: "0deg",
    rotate: 0,
    overlayRotate: 0,
    value: CENTER_FRAME,
    cropMask: CENTER_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      bottom: 0,
      minHeight: 56,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Circle",
    imgRotate: "0deg",
    rotate: 0,
    overlayRotate: 0,
    value: CIRCLE_FRAME,
    cropMask: CIRCLE_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      bottom: 0,
      minHeight: 56,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Landscape",
    imgRotate: "0deg",
    rotate: 0,
    overlayRotate: 0,
    value: TWOSIDE_LANDSCAPE_FRAME,

    cropMask: LANDSCAPE_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      bottom: 0,
      minHeight: 80,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Portrait",
    imgRotate: "90deg",
    rotate: Math.PI / 2,
    overlayRotate: Math.PI / 2,
    value: TWOSIDE_PORTRAIT_FRAME,

    cropMask: LANDSCAPE_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      top: 0,
      minHeight: 100,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Left",
    imgRotate: "0deg",
    rotate: 0,
    overlayRotate: Math.PI / 2,
    value: LEFT_FRAME,
    cropMask: PORTRAIT_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      top: 0,
      minHeight: 135,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Right",
    imgRotate: "180deg",
    rotate: Math.PI,
    overlayRotate: Math.PI / 2,
    value: RIGHT_FRAME,
    cropMask: PORTRAIT_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      bottom: 0,
      minHeight: 135,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Top",
    imgRotate: "90deg",
    rotate: (3 * Math.PI) / 2,
    overlayRotate: 0,
    value: TOP_FRAME,
    cropMask: PORTRAIT_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      top: 0,
      minHeight: 135,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
  {
    name: "Bottom",
    imgRotate: "-90deg",
    rotate: Math.PI / 2,
    overlayRotate: 0,
    value: BOTTOM_FRAME,
    cropMask: PORTRAIT_FRAME_SRC,
    viewFrameStyle: {
      position: "absolute",
      bottom: 0,
      minHeight: 135,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    textFrameStyle: {
      ...textShadow,
      textAlign: "center",
      justifyContent: "center",
      fontSize: 30,
      color: Colors.black,
    },
  },
];

export default frameConsts;

export const BLANK_FRAME="BLANK_FRAME"
export const CENTER_FRAME="CENTER_FRAME"
export const CIRCLE_FRAME="CIRCLE_FRAME"
export const TWOSIDE_LANDSCAPE_FRAME="TWOSIDE_LANDSCAPE_FRAME"
export const TWOSIDE_PORTRAIT_FRAME="TWOSIDE_PORTRAIT_FRAME"
export const LEFT_FRAME="LEFT_FRAME"
export const RIGHT_FRAME="RIGHT_FRAME"
export const TOP_FRAME="TOP_FRAME"
export const BOTTOM_FRAME="BOTTOM_FRAME"

import BLANK_FRAME_SRC from '../assets/masks/blank.png';
import CENTER_FRAME_SRC from '../assets/masks/center.png';
import CIRCLE_FRAME_SRC from '../assets/masks/circle.png';
import LANDSCAPE_FRAME_SRC from '../assets/masks/landscape.png';
import PORTRAIT_FRAME_SRC from '../assets/masks/portrait.png';

const frameConsts = [
  { name: "Blank", imgRotate: '0deg', rotate:0, value: BLANK_FRAME, cropMask: BLANK_FRAME_SRC },
  { name: "Center", imgRotate: '0deg', rotate:0, value: CENTER_FRAME, cropMask: CENTER_FRAME_SRC },
  { name: "Circle", imgRotate: '0deg', rotate:0, value: CIRCLE_FRAME, cropMask: CIRCLE_FRAME_SRC },
  {
    name: "Landscape", imgRotate: '0deg', rotate:0,
    value: TWOSIDE_LANDSCAPE_FRAME,
    cropMask: LANDSCAPE_FRAME_SRC,
  },
  {
    name: "Portrait", imgRotate: '90deg', rotate:Math.PI/2,
    value: TWOSIDE_PORTRAIT_FRAME,
    cropMask: LANDSCAPE_FRAME_SRC,
  },
  { name: "Left", imgRotate: '0deg', rotate:0, value: LEFT_FRAME, cropMask: PORTRAIT_FRAME_SRC },
  { name: "Right", imgRotate: '180deg', rotate:Math.PI, value: RIGHT_FRAME, cropMask: PORTRAIT_FRAME_SRC },
  { name: "Top", imgRotate: '90deg', rotate:(3*Math.PI)/2, value: TOP_FRAME, cropMask: PORTRAIT_FRAME_SRC },
  { name: "Bottom", imgRotate: '-90deg', rotate:Math.PI/2, value: BOTTOM_FRAME, cropMask: PORTRAIT_FRAME_SRC },
];

export default frameConsts;
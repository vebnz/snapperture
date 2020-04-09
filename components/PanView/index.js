import { View } from "react-native";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Animated, PanResponder } from "react-native";

const PanView = (props) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [panDimensions, setPanDimensions] = useState({ height: 0, width: 0 });

  const [panResponder, setPanResponder] = useState({panHandlers:{}});

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          if (panDimensions.height > 0 && panDimensions.width > 0) {
            const { pageX, pageY } = evt.nativeEvent;
            const pointer = [.5-(pageX / panDimensions.width), (-.5+(pageY / panDimensions.height))]
            position.setValue(pointer);
            props.onFXDragPosition(pointer)
          }
        },
        onPanResponderRelease: (evt, gestureState) => {},
      })
    );
  }, [panDimensions]);

  const onLayout = (evt) => {
    const { width, height } = evt.nativeEvent.layout;
    setPanDimensions({ width, height });
  };

  return (
    <View onLayout={onLayout} {...panResponder.panHandlers} style={props.style}>
      {props.children}
    </View>
  );
};

export default PanView;

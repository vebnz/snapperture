import Expo2DContext from "expo-2d-context";
import { GLView } from "expo-gl";
import React, { useRef, useState, useEffect } from "react";
import { Surface, Button, Colors, TextInput } from "react-native-paper";
import { Image } from "react-native";
import * as MediaLibrary from "expo-media-library";

const TextRenderTarget = (props) => {
  const canvasRenderer = useRef()
  const [renderImg, setRenderImg] = useState(false)
  const [captionText, setCaptionText] = useState('caption')
  const [glContext, setRootGLContext] = useState(false)

  const updateContext = async ({text, width, height}) => {
    if (!glContext) return;

    const maxWidth = width;
    const maxHeight = height;
    const lineHeight = 72;
    let x = 0;
    let y = 60;

    const ctx = new Expo2DContext(glContext);
    await ctx.initializeText();

    ctx.fillStyle = "blue";
    ctx.font = " 72pt sans-serif";
    const words = text.split(" ");
    let line = "";

    words.map((word, n) => {
      let testLine = line + word + " ";
      let metric = ctx.measureText(testLine);
      let testWidth = metric.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = word + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, x, y);
    
    ctx.flush();
    const img = await GLView.takeSnapshotAsync(glContext, {format:"png"})
    console.log("onContextCreate -> img", img)
    setRenderImg(img)
  };

  return (
    <Surface
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        alignContent: "space-between",
      }}
    >
      <TextInput
        label="Caption"
        value={captionText}
        onChangeText={async (text) => {
          await updateContext({ text, width: 500, height: 200 });
          setCaptionText(text);
        }}
      />
      <GLView
        ref={canvasRenderer}
        style={{ height: 200, width: 500 }}
        onContextCreate={(gl) => {
          setRootGLContext(gl);
          updateContext({ text: captionText, width: 500, height: 200 });
        }}
      />
      {!!renderImg && (
        <Image
          style={{ width: renderImg.width, height: renderImg.height }}
          source={{ uri: renderImg.localUri }}
        />
      )}
    </Surface>
  );
};

TextRenderTarget.defaultProps = {
  text: "Givenchi fly nor then this that. The birth  to."
}
export default TextRenderTarget;

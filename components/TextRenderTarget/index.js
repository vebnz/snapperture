import Expo2DContext from "expo-2d-context";
import { GLView } from "expo-gl";
import React, { useRef, useState } from "react";
import { Surface, Button, Colors } from "react-native-paper";
import { Image } from "react-native";
import * as MediaLibrary from "expo-media-library";

const TextRenderTarget = (props) => {
  const canvasRenderer = useRef()
  const [renderImg, setRenderImg] = useState(false)
  const onContextCreate = async (gl) => {
    var ctx = new Expo2DContext(gl);
    await ctx.initializeText();
    ctx.fillStyle = "blue";
    ctx.font = "italic 72pt sans-serif";
    ctx.fillText("FWEEEET", 100, 100);
    ctx.flush();

  };

  return (
    <Surface style={{ backgroundColor: Colors.white }}>
      <GLView
        ref={canvasRenderer}
        style={{ marginTop: 100, height: 500, width: 500 }}
        onContextCreate={onContextCreate}
      />
      {!!renderImg && (
        <Image
          style={{ width: "100%", height: undefined, aspectRatio: 1 }}
          source={{ uri: renderImg }}
        />
      )}
      <Button
        mode="contained"
        color={Colors.amber500}
        onPress={async () => {
          const snap = await canvasRenderer.current.takeSnapshotAsync();
          console.log("TextRenderTarget -> snap", snap);
          setRenderImg(snap.localUri);
          const {
            status,
            permissions,
          } = await MediaLibrary.requestPermissionsAsync();
          if (status === "granted") {
            return MediaLibrary.saveToLibraryAsync(snap.localUri);
          } else {
            throw new Error("CameraRoll permission not granted");
          }
        }}
      >
        snap
      </Button>
    </Surface>
  );
};

export default TextRenderTarget;

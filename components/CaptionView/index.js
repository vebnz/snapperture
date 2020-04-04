import React, { useState } from 'react';
import { Surface, Title, TextInput, IconButton } from 'react-native-paper';
import { View } from 'react-native';

const CaptionView = (props) => {
  const [captionText, setCaptionText] = useState(false)

  return (
    <Surface style={{ flex: 1, justifyContent: "flex-start" }}>
      <Title style={{ textAlign: "center" }}>Caption</Title>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{ flex: 1 }}
          label="Caption"
          value={captionText || props.captionText}
          onChangeText={text => {
            setCaptionText(text);
            props.onSetCaptionText(text);
          }}
          onSubmitEditing={() => {
            props.onRenderCaption();
          }}
        />
        <IconButton icon="send" onPress={() => props.onRenderCaption()} />
      </View>
    </Surface>
  );
}
CaptionView.defaultProps = {
  captionText: 'caption'
}
export default CaptionView;
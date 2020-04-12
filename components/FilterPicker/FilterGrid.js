import React from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Modal, Text, withStyles } from '@ui-kitten/components';
import filterConsts from '../../constants/Filters';


const FilterGrid = (props) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onSelectFilter(item);
        }}
      >
        <View
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            width: 100,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image source={item.preview} style={{ width: 100, height: 50 }} />
          <Text
            style={{
              width: 100,
              fontSize: 12,
              backgroundColor: "#212121",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <Modal
      style={{ height: "80%", flex: 1 }}
      visible={props.showFilterModal}
      backdropStyle={props.eva.style.mStyle}
    >
      <FlatList
        data={filterConsts}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        numColumns={3}
        style={{ flex: 1 }}
      />
    </Modal>
  );
}


FilterGrid.defaultProps={
  showFilterModal:false
}

export const ThemedFilterGrid = withStyles(FilterGrid, (theme) => ({
  mStyle: {
    backgroundColor: theme['background-basic-color-1']
  }
}));
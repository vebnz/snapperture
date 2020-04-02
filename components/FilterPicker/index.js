import React, { useState } from "react";
import { Menu, Button } from "react-native-paper";
import filterConsts from '../../constants/Filters'

const FilterPicker = props => {
  const [visible, setVisible] = useState(false);
  
  const onSelectFilter = filter => {
    props.onSelectFilter(filter);
    setVisible(false);
  };
  
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Button mode="contained"  onPress={() => setVisible(true)}>Filters</Button>}
    >

      {filterConsts.map(filter=>{
        return (
          <Menu.Item
            key={filter.value}
            onPress={() => {
              onSelectFilter(filter);
            }}
            title={filter.name}
          />
        );
      })}
    </Menu>
  );
};

export default FilterPicker;

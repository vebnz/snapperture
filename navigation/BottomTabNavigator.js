import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ShareScreen from '../screens/ShareScreen';
import { SafeAreaView } from 'react-native';

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Colors } from 'react-native-paper';


const BottomTab = createMaterialBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Home';

const BottomTabNavigator = ({ navigation, route }) => {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator shifting initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: Colors.amber900,
          tabBarIcon: 'camera'
        }}
      />
      <BottomTab.Screen
        name="Share"
        component={ShareScreen}
        options={{
          tabBarColor: Colors.grey900,
          tabBarIcon: 'share-variant'
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;


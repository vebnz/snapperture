import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ShareScreen from "../screens/ShareScreen";

const { Navigator, Screen } = createBottomTabNavigator();
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Camera" icon={(props) => <Icon {...props} name="camera" />} />
    <BottomNavigationTab title="Share" icon={(props) => <Icon {...props} name="share-variant" />} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Camera" component={HomeScreen} />
    <Screen name="Share" component={ShareScreen} />
  </Navigator>
);

const BottomTabNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
)

export default TabNavigator;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ShareScreen from "../screens/ShareScreen";
import {CaptionScreen} from '../screens/CaptionScreen';
import { View } from "react-native";
import ImageSourceScreen from '../screens/ImageSourceScreen';
import CropperScreen from "../screens/CropperScreen";

const { Navigator, Screen } = createBottomTabNavigator();
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    tabBarOptions={{ keyboardHidesTabBar: true }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Source"
      icon={(props) => (
        <View style={{ flexDirection: "row" }}>
          <Icon {...props} name="film" />
          <Icon {...props} name="image-multiple" />
        </View>
      )}
    />
    <BottomNavigationTab
      title="Editor"
      icon={(props) => <Icon {...props} name="camera" />}
    />
    <BottomNavigationTab
      title="Share"
      icon={(props) => <Icon {...props} name="share-variant" />}
    />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    tabBarOptions={{ keyboardHidesTabBar: true }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Source" component={ImageSourceScreen} />
    <Screen
      name="Editor"
      component={HomeScreen}
      initialParams={{ imageSource: false }}
    />
    <Screen name="Share" component={ShareScreen} />
    <Screen name="Caption" component={CaptionScreen} />
    <Screen name="Cropper" component={CropperScreen} />
  </Navigator>
);

const BottomTabNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
)

export default TabNavigator;

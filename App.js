import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import * as eva from "@eva-design/eva";
import { default as theme } from "./calo-theme.json";
import { default as mapping } from "./mapping.json";

import {
  ApplicationProvider,
  Layout,
  Text,
  IconRegistry,
} from "@ui-kitten/components";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import { MCIconsPack } from "./components/IconAdapter";

const Stack = createStackNavigator();

const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  SplashScreen.preventAutoHide();
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          Quicksand: require("./assets/fonts/Quicksand-Medium.ttf"),
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          avantquelombre: require("./assets/fonts/album-avantquelombre.ttf"),
          BebasNeue: require("./assets/fonts/BebasNeue.ttf"),
          BondoluoPeek: require("./assets/fonts/BondoluoPeek.ttf"),
          Brain: require("./assets/fonts/Brain-Flower-Euro.ttf"),
          Christians: require("./assets/fonts/Christians-United.ttf"),
          daniel: require("./assets/fonts/daniel.ttf"),
          edosz: require("./assets/fonts/edosz.ttf"),
          fashionistafree: require("./assets/fonts/fashionistafree.ttf"),
          jersey_stories: require("./assets/fonts/jersey_stories.ttf"),
          OneDirection: require("./assets/fonts/OneDirection.ttf"),
          SF: require("./assets/fonts/SF-New-Republic-Bold.ttf"),
          Signerica_Medium: require("./assets/fonts/Signerica_Medium.ttf"),
          Silent: require("./assets/fonts/Silent-Reaction.ttf"),
          Sunshine: require("./assets/fonts/Sunshine-in-my-Soul.ttf"),
          Sweetly: require("./assets/fonts/Sweetly-Broken.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Layout
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <Text>Loaderating...</Text>
        </Layout>
      </ApplicationProvider>
    );
  } else {
    return (
      <React.Fragment>
        <IconRegistry icons={MCIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.dark, ...theme }}
          customMapping={mapping}
        >
          <Layout style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              {/* <Stack.Navigator
                headerMode="screen"
                screenOptions={{
                  header: ({ scene, previous, navigation }) => (
                    <React.Fragment />
                  ),
                }}
              >
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              </Stack.Navigator> */}
              <BottomTabNavigator />
            </NavigationContainer>
          </Layout>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

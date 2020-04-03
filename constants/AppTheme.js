import color from "color";
import { Provider as PaperProvider, DefaultTheme, Colors } from "react-native-paper";

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  mode: "adaptive",
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Brown500,
    accent: Colors.amber900,
    background: Colors.grey900,
    surface: Colors.grey900,
    error: Colors.redA400,
    onBackground: Colors.white,
    onSurface:Colors.white,
    text: Colors.white,
    disabled: color(Colors.grey50)
      .alpha(0.38)
      .rgb()
      .string(),
    placeholder: color(Colors.grey50)
      .alpha(0.54)
      .rgb()
      .string(),
    backdrop: color(Colors.grey900)
      .alpha(0.5)
      .rgb()
      .string(),
    notification: Colors.amberA100
  }
};

export default DarkTheme;

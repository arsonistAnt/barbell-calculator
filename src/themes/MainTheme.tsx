import { DefaultTheme, configureFonts } from "react-native-paper";
import {
  useFonts,
  Oxygen_300Light,
  Oxygen_400Regular,
  Oxygen_700Bold,
} from "@expo-google-fonts/oxygen";
import { Fonts } from "react-native-paper/lib/typescript/src/types";

/**
 * Loads and returns the Oxygen custom font and construct it into a Fonts object.
 *
 * @returns a Fonts object for the react native paper's fonts property in the DefaultTheme object.
 */
export const loadFonts = (): Fonts => {
  const { fonts } = DefaultTheme;
  const [loadedFonts] = useFonts({
    Oxygen_300Light,
    Oxygen_400Regular,
    Oxygen_700Bold,
  });
  if (!loadedFonts) {
    return fonts;
  } else {
    const defaultFontConfig = {
      default: {
        regular: {
          fontFamily: "Oxygen_400Regular",
          fontWeight: "400" as "400",
        },
        medium: {
          fontFamily: "Oxygen_700Bold",
          fontWeight: "700" as "700",
        },
        light: {
          fontFamily: "Oxygen_300Light",
          fontWeight: "300" as "300",
        },
        thin: {
          fontFamily: "Oxygen_300Light",
          fontWeight: "300" as "300",
        },
      },
    };
    // @ts-ignore
    defaultFontConfig.ios = defaultFontConfig.default;
    // @ts-ignore
    defaultFontConfig.android = defaultFontConfig.default;
    return configureFonts(defaultFontConfig);
  }
};

// Store pre-defined colors here.
const predefinedColors = {
  darkPurple: "#0A0E2A",
  lightPurple: "#323453",
};
const { darkPurple, lightPurple } = predefinedColors;

// Create custom props for the main theme, this way must be created to comply with typescript.
declare global {
  namespace ReactNativePaper {
    interface Theme {
      appTitle: String;
      mainTitleSize: number;
    }
  }
}

// The main theme object that will be used in the app global. All the properties
// in this object will be used to set the styles of the components
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkPurple,
    accent: lightPurple,
    text: "white",
    background: lightPurple,
  },
  appTitle: "Plate Calculator",
  mainTitleSize: 28,
};

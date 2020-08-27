import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/mainscreen/MainScreen";
import SettingScreen from "./src/screens/settingscreen/SettingScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { SettingsProvider } from "./src/context/SettingsContext";
import { Ionicons } from "@expo/vector-icons";
import MainTheme, { loadFonts } from "./src/themes/MainTheme";

const AppStack = createStackNavigator();

function AppStackComponent() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Plate Calculator" component={MainScreen} />
        <AppStack.Screen name="Settings" component={SettingScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  // Load custom fonts into main theme.
  const theme = { ...MainTheme, fonts: loadFonts() };
  return (
    <SettingsProvider>
      <PaperProvider
        theme={theme}
        settings={{
          icon: (props) => <Ionicons {...props} />,
        }}
      >
        <AppStackComponent />
      </PaperProvider>
    </SettingsProvider>
  );
}

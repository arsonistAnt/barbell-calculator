import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./src/screens/mainscreen/MainScreen";
import PlateInventoryScreen from "./src/screens/plateinventoryscreen/PlateInventoryScreen";
import SettingScreen from "./src/screens/settingscreen/SettingScreen";

const BottomTabNavigator = createBottomTabNavigator();

//TODO:- Icons, customize to black
//https://stackoverflow.com/questions/59304281/create-custom-bottom-tab-navigator-in-react-native

function Tabs() {
  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabNavigator.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <BottomTabNavigator.Screen
        name="Inventory"
        component={PlateInventoryScreen}
      />
      <BottomTabNavigator.Screen name="Settings" component={SettingScreen} />
    </BottomTabNavigator.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

/**
 * NOTES:-
 * Dependencies installed
 * npm install @react-navigation/native
 *
 * npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
 */

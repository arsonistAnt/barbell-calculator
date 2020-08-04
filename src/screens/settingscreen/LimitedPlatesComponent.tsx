import React, { useContext } from "react";
import { Context as SettingsContext } from "../../context/SettingsContext";
import { Switch } from "react-native";

const LimitedPlatesComponent: React.FC = () => {
  const { state: userSettings, dispatch } = useContext(SettingsContext);
  const toggleSwitch = () =>
    dispatch({
      type: "toggle_custom_plates",
      isEnabled: !userSettings.customMode,
    });
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={userSettings.customMode}
    />
  );
};

export default LimitedPlatesComponent;

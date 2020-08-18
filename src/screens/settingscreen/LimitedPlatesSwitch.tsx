import React, { useContext } from "react";
import {
  Context as SettingsContext,
  getCurrentPlateTypeConfig,
} from "../../context/SettingsContext";
import { Switch } from "react-native";
import { DefaultPlateConfig } from "../../utils/PlateCalculation";

const LimitedPlatesComponent: React.FC = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const currentConfig = getCurrentPlateTypeConfig(state);
  const toggleSwitch = () =>
    dispatch({
      type: "update_plate_config",
      newPlateConfig: {
        ...currentConfig,
        useLimitedPlates: !currentConfig.useLimitedPlates,
      } as DefaultPlateConfig,
    });

  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={currentConfig.useLimitedPlates}
    />
  );
};

export default LimitedPlatesComponent;

import React, { useContext } from "react";
import { Context as SettingsContext } from "../../context/SettingsContext";
import { Switch } from "react-native";
import { DefaultPlateConfig } from "../../utils/PlateCalculation";

const LimitedPlatesComponent: React.FC = () => {
  const {
    state: { plateConfig },
    dispatch,
  } = useContext(SettingsContext);
  const toggleSwitch = () =>
    dispatch({
      type: "update_plate_config",
      newPlateConfig: {
        ...plateConfig,
        useLimitedPlates: !plateConfig.useLimitedPlates,
      } as DefaultPlateConfig,
    });

  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={plateConfig.useLimitedPlates}
    />
  );
};

export default LimitedPlatesComponent;

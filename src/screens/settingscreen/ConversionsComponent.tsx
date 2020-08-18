import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  Context as SettingsContext,
  CalculationSettings,
} from "../../context/SettingsContext";
import {
  WeightConversions,
  PlateConfig,
  DefaultPlateConfig,
} from "../../utils/PlateCalculation";

/**
 * Returns a string name of the weight type.
 * @param type The weight type.
 */
const getConversionTypeStr = (type: WeightConversions) => {
  switch (type) {
    case WeightConversions.Kilograms:
      return "Kg";
    default:
      return "Lb";
  }
};

/**
 * Returns the plate configuration based on the current selected weight type in the user settings.
 *
 * @param userSettings The user settings that stores the different configurations for the different weight types.
 * @return the plate configuration for the current weight type selection.
 */
const toggleCurrentConversion = (
  userSettings: CalculationSettings,
  action: (newWeightType: WeightConversions) => void
) => {
  let newWeightType = userSettings.currentWeightType;
  if (newWeightType == WeightConversions.Pounds) {
    newWeightType = WeightConversions.Kilograms;
    action(newWeightType);
  } else {
    newWeightType = WeightConversions.Pounds;
    action(newWeightType);
  }
};

const ConversionsComponent: React.FunctionComponent = () => {
  const { state: userSettings, dispatch } = useContext(SettingsContext);
  const { currentWeightType } = userSettings;
  const toggleAction = (newWeightType: WeightConversions) => {
    dispatch({ type: "update_current_config_type", weightType: newWeightType });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => toggleCurrentConversion(userSettings, toggleAction)}
        style={styles.container}
      >
        <Text style={styles.weightTypeText}>
          {getConversionTypeStr(currentWeightType)}
        </Text>
        <Entypo
          name="chevron-thin-right"
          style={{ paddingLeft: 4 }}
          size={18}
          color="#505050"
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  weightTypeText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default ConversionsComponent;

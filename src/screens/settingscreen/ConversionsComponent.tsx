import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Context as SettingsContext } from "../../context/SettingsContext";
import {
  WeightConversions,
  PlateConfig,
  DefaultPlateConfig,
} from "../../utils/PlateCalculation";

const ConversionsComponent: React.FunctionComponent = () => {
  const { state: userSettings, dispatch } = useContext(SettingsContext);
  const { conversionType } = userSettings.plateConfig;

  const getConversionTypeStr = (type: WeightConversions) => {
    switch (type) {
      case WeightConversions.Kilograms:
        return "Kg";
      default:
        return "Lb";
    }
  };

  const toggleConversion = (plateConfig: PlateConfig) => {
    let newConfig = Object.assign(new DefaultPlateConfig(), plateConfig);
    if (conversionType == WeightConversions.Kilograms) {
      newConfig.conversionType = WeightConversions.Pounds;
      newConfig.toLb();
    } else {
      newConfig.conversionType = WeightConversions.Kilograms;
      newConfig.toKg();
    }
    dispatch({
      type: "update_plate_config",
      newPlateConfig: { ...newConfig },
    });
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => toggleConversion(userSettings.plateConfig)}
        style={styles.container}
      >
        <Text style={styles.weightTypeText}>
          {getConversionTypeStr(conversionType)}
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

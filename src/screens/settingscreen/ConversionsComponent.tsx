import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Context as SettingsContext } from "../../context/SettingsContext";
import { WeightConversions, PlateConfig } from "../../utils/PlateCalculation";

const ConversionsComponent = () => {
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

  const toggleConversion = () => {
    let newConvType = WeightConversions.Pounds;
    if (conversionType == WeightConversions.Kilograms) {
      newConvType = WeightConversions.Pounds;
    } else {
      newConvType = WeightConversions.Kilograms;
    }
    dispatch({ type: "update_type_conversion", conversionType: newConvType });
  };

  return (
    <>
      <TouchableOpacity onPress={toggleConversion} style={styles.container}>
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

import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import IncrementButton from "../../components/button/IncrementButton";
import { Context as SettingsContext } from "../../context/SettingsContext";
import { PlateConfig, DefaultPlateConfig } from "../../utils/PlateCalculation";

// TODO: Increment by 1, or -1 depending on type conversion.
const BarWeightComponent: React.FunctionComponent = () => {
  const settingsState = useContext(SettingsContext);
  const {
    state: { plateConfig },
    dispatch,
  } = settingsState;
  const currBarWeight = plateConfig.barbellWeight;

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.barWeightText, { marginRight: 12 }]}>
          {currBarWeight}
        </Text>
        <IncrementButton
          onIncrementPressed={() =>
            dispatch({
              type: "update_plate_config",
              newPlateConfig: {
                ...plateConfig,
                barbellWeight: plateConfig.barbellWeight + 5,
              } as DefaultPlateConfig,
            })
          }
          onDecrementPressed={() =>
            dispatch({
              type: "update_plate_config",
              newPlateConfig: {
                ...plateConfig,
                barbellWeight: plateConfig.barbellWeight - 5,
              } as DefaultPlateConfig,
            })
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  barWeightText: {
    color: "#FFFFFF",
    marginHorizontal: 4,
    fontSize: 22,
  },
});

export default BarWeightComponent;

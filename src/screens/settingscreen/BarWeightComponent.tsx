import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import IncrementButton from "../../components/button/IncrementButton";
import { Context as SettingsContext } from "../../context/SettingsContext";
import {
  PlateConfig,
  DefaultPlateConfig,
  WeightConversions,
} from "../../utils/PlateCalculation";

/**
 * Returns the incremental value determined by the weight type conversion.
 *
 * @param type Weight type.
 * @return an integer that represents an incremental value.
 */
const getIncrementalValue = (type: WeightConversions): number => {
  switch (type) {
    case WeightConversions.Kilograms:
      return 1;
    default:
      return 5;
  }
};

const BarWeightComponent: React.FunctionComponent = () => {
  const settingsState = useContext(SettingsContext);
  const {
    state: { plateConfig },
    dispatch,
  } = settingsState;
  const currBarWeight = plateConfig.barbellWeight;
  const incrementalVal = getIncrementalValue(plateConfig.conversionType);

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
                barbellWeight: plateConfig.barbellWeight + incrementalVal,
              } as DefaultPlateConfig,
            })
          }
          onDecrementPressed={() =>
            dispatch({
              type: "update_plate_config",
              newPlateConfig: {
                ...plateConfig,
                barbellWeight: plateConfig.barbellWeight + incrementalVal * -1,
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

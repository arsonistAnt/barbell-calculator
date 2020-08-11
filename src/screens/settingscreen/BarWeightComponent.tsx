import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import IncrementButton from "../../components/button/IncrementButton";
import { Context as SettingsContext } from "../../context/SettingsContext";

const BarWeightComponent: React.FC = () => {
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
              },
            })
          }
          onDecrementPressed={() =>
            dispatch({
              type: "update_plate_config",
              newPlateConfig: {
                ...plateConfig,
                barbellWeight: plateConfig.barbellWeight - 5,
              },
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

import React, { useState, useContext, FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./mainScreenHeader";
import Body from "./mainScreenBody";
import PlateCalculation, {
  Plate,
  DefaultPlateConfig,
} from "../../utils/PlateCalculation";
import {
  Context as SettingsContext,
  CalculationSettings,
  getCurrentPlateTypeConfig,
} from "../../context/SettingsContext";
import { useTheme } from "react-native-paper";

const DismissKeyboard: FunctionComponent = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

/**
 * Use the plate configuration in the user settings to calculate the list of plates.
 *
 * @param config The plate configuration to use for this calculation.
 * @param targetWeight The target weight to calculate for.
 */
const calculatePlates = (
  plateConfig: DefaultPlateConfig,
  targetWeight: number
): { plates?: Array<Plate>; leftoverWeight: number } => {
  let plates = PlateCalculation.calcRequiredPlates(
    targetWeight,
    // A new copy of plate config must be created, otherwise we will be referencing the plateConfig stored in the state.
    new DefaultPlateConfig(plateConfig)
  );
  return plates;
};

const MainScreen = () => {
  const { colors } = useTheme();
  const { state } = useContext(SettingsContext);
  const [weight, setWeight] = useState(0.0);
  const currConfig = getCurrentPlateTypeConfig(state);
  let plates = calculatePlates(currConfig, weight);
  const handleChangeWeight = (currWeight: number) => {
    setWeight(currWeight);
  };

  //AsyncStorage.clear();

  return (
    <DismissKeyboard>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header handleChangeWeight={handleChangeWeight} weight={weight} />
        <Body calculatedPlates={plates} />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
});

export default MainScreen;

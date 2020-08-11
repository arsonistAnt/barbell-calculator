import React, { useState, useContext, FunctionComponent } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./mainScreenHeader";
import Body from "./mainScreenBody";
import PlateCalculation, { Plate } from "../../utils/PlateCalculation";
import {
  Context as SettingsContext,
  CalculationSettings,
} from "../../context/SettingsContext";
import AsyncStorage from "@react-native-community/async-storage";

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
  userSettings: CalculationSettings,
  targetWeight: number
): { plates?: Array<Plate>; leftoverWeight: number } => {
  const { plateConfig } = userSettings;
  const { availablePlates, barbellWeight } = plateConfig;

  let plates = PlateCalculation.calcRequiredPlates(targetWeight, plateConfig);
  return plates;
};

const MainScreen = () => {
  const { state: userSettings } = useContext(SettingsContext);
  const [weight, setWeight] = useState(0.0);
  let plates = calculatePlates(userSettings, weight);

  const handleChangeWeight = (currWeight: number) => {
    setWeight(currWeight);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
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

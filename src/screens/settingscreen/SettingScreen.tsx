import React, { useContext } from "react";
import { StyleSheet, Text, SafeAreaView, View, Button } from "react-native";
import {
  OptionsList,
  OptionItem,
} from "../../components/optionlist/OptionList";
import { Plate } from "../../utils/PlateCalculation";
import { PlateList } from "../../components/platelist/PlateList";
import BarWeightComponent from "./barWeightComponent";
import ConversionsComponent from "./conversionsComponent";
import LimitedPlatesComponent from "./limitedPlatesComponent";
import { Context as SettingsContext } from "../../context/SettingsContext";

// Create list of options for our options list.
const optionItems: Array<OptionItem> = [
  {
    id: 0,
    optionLabel: "Unit",
    itemComponent: ConversionsComponent,
  },
  {
    id: 1,
    optionLabel: "Bar weight",
    itemComponent: BarWeightComponent,
  },
  {
    id: 3,
    optionLabel: "Limited number of plates",
    itemComponent: LimitedPlatesComponent,
  },
];

const SettingScreen: React.FC = () => {
  const settingsState = useContext(SettingsContext);
  const { state: userSettings, dispatch } = settingsState;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <OptionsList optionItemList={optionItems} />
          <View style={{ marginVertical: 16 }} />
          <PlateList
            plateConfiguration={userSettings.plateConfig}
            custom={userSettings.customMode}
            currentSelection={userSettings.checkedPlateTypes}
            onUpdateCurrentSelection={(availableTypes: Set<number>) => {
              dispatch({
                type: "update_checked_plates",
                newTypeSet: availableTypes,
              });
            }}
            onIncrementUpdate={(plate: Plate, amount: number) => {
              plate.amount = amount;
              dispatch({ type: "update_plate_amount", newPlate: plate });
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#171717",
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default SettingScreen;

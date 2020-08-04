import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import {
  OptionsList,
  OptionItem,
} from "../../components/optionlist/OptionList";
import { Plate } from "../../utils/PlateCalculation";
import { PlateList } from "../../components/platelist/PlateList";
import BarWeightComponent from "./BarWeightComponent";
import ConversionsComponent from "./ConversionsComponent";
import LimitedPlatesComponent from "./LimitedPlatesComponent";
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
        <Text style={styles.itemText}>This is the setting screen</Text>
        <View style={{ marginTop: 10 }}>
          <OptionsList optionItemList={optionItems} />
          <View style={{ marginVertical: 16 }} />
          <PlateList
            plateConfiguration={userSettings.plateConfig}
            custom={userSettings.customMode}
            currentSelection={userSettings.checkedPlates}
            onUpdateCurrentSelection={(plates: Set<Plate>) => {
              dispatch({ type: "update_checked_plates", newSet: plates });
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

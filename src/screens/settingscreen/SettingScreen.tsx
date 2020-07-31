import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import {
  OptionsList,
  OptionItem,
} from "../../components/optionlist/OptionList";
import { DefaultPlateConfig } from "../../utils/PlateCalculation";
import { PlateList } from "../../components/platelist/PlateList";
import BarWeightComponent from "./BarWeightComponent";
import ConversionsComponent from "./ConversionsComponent";
import LimitedPlatesComponent from "./LimitedPlatesComponent";

const SettingScreen: React.FC = () => {
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

  // By default the DefaultPlateConfig.availablePlates is sorted from least to greatest so we must check
  // if we have to reverse the array to display the list of available plates from greatest to least.
  const defaultPlateConfig = new DefaultPlateConfig();
  defaultPlateConfig.availablePlates = defaultPlateConfig.availablePlates.reverse();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.itemText}>This is the setting screen</Text>
        <View style={{ marginTop: 10 }}>
          <OptionsList optionItemList={optionItems} />
          <View style={{ marginVertical: 16 }} />
          <PlateList plateConfiguration={defaultPlateConfig} custom={false} />
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

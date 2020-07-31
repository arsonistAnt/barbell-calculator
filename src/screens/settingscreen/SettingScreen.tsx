import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  View,
  TouchableHighlight,
} from "react-native";
import {
  OptionsList,
  OptionItem,
} from "../../components/optionlist/OptionList";
import {
  DefaultPlateConfig,
  WeightConversions,
} from "../../utils/PlateCalculation";
import { PlateList } from "../../components/platelist/PlateList";
// Import Icons
import { Entypo } from "@expo/vector-icons";

const WeightTypeConversionBtn = () => {
  const [toggle, toggleType] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => toggleType(!toggle)}
        style={{ marginRight: 4, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={styles.itemText}>{toggle ? "Kg" : "Lb"}</Text>
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

// TODO:- Turn this into a separate component under settingscreen folder.
const BarWeightComponentBtn = () => {
  const [barWeight, changeBarWeight] = useState(45);
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.barWeightText, { marginRight: 12 }]}>
          {barWeight}
        </Text>
        {/* TODO:- Turn this into a component */}
        <View
          style={{
            borderRadius: 8,
            backgroundColor: "#222222",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            width: 90,
          }}
        >
          <TouchableHighlight
            underlayColor="#616161"
            activeOpacity={0.95}
            style={{
              borderRadius: 8,
              flex: 1,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
            onPress={() => changeBarWeight(barWeight - 5)}
          >
            <Entypo style={{}} name="minus" size={20} color="black" />
          </TouchableHighlight>
          <View
            style={{
              height: "60%",
              width: 2,
              backgroundColor: "#2B2B2C",
            }}
          />
          <TouchableHighlight
            underlayColor="#616161"
            activeOpacity={0.95}
            style={{
              borderRadius: 8,
              paddingVertical: 6,
              paddingHorizontal: 12,
              flex: 1,
            }}
            onPress={() => changeBarWeight(barWeight + 5)}
          >
            <Entypo name="plus" size={20} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

const LimitedPlatesComponentBtn = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

const SettingScreen: React.FC = () => {
  // Create list of options for our options list.
  const optionItems: Array<OptionItem> = [
    {
      id: 0,
      optionLabel: "Unit",
      itemComponent: WeightTypeConversionBtn,
    },
    {
      id: 1,
      optionLabel: "Bar weight",
      itemComponent: BarWeightComponentBtn,
    },
    {
      id: 3,
      optionLabel: "Limited number of plates",
      itemComponent: LimitedPlatesComponentBtn,
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
          <PlateList plateConfiguration={defaultPlateConfig} />
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
  optionText: {
    color: "#FFFFFF",
    marginHorizontal: 4,
    fontSize: 20,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  barWeightText: {
    color: "#FFFFFF",
    marginHorizontal: 4,
    fontSize: 22,
  },
});

export default SettingScreen;

<<<<<<< HEAD
<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingScreen = () => {
  return <Text>This is the SETTINGSCREEN screen.</Text>;
=======
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> Add button functionality in the setting screen
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  View,
} from "react-native";
import { OptionsList, OptionItem } from "../components/optionlist/OptionList";
import {
  DefaultPlateConfig,
  WeightConversions,
} from "../utils/PlateCalculation";
import { PlateList } from "../components/platelist/PlateList";

const WeightTypeConversionBtn = () => {
  const [toggle, toggleType] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => toggleType(!toggle)}
        style={{ marginRight: 4 }}
      >
        <Text style={styles.itemText}>{toggle ? "Kg" : "Lb"}</Text>
      </TouchableOpacity>
    </>
  );
};

const BarWeightComponentBtn = () => {
  const [barWeight, changeBarWeight] = useState(45);
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.optionText, { marginRight: 12 }]}>
          {barWeight}
        </Text>
        <TouchableOpacity onPress={() => changeBarWeight(barWeight + 1)}>
          <Text style={[styles.optionText, { color: "#f44336" }]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeBarWeight(barWeight - 1)}>
          <Text style={[styles.optionText, { color: "#03a9f4" }]}>
            Subtract
          </Text>
        </TouchableOpacity>
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

const SettingScreen = () => {
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.itemText}>This is the setting screen</Text>
        <View style={{ marginTop: 80 }}>
          <OptionsList optionItemList={optionItems} />
          <View style={{ marginVertical: 16 }} />
          <PlateList plateConfiguration={new DefaultPlateConfig()} />
        </View>
      </SafeAreaView>
    </>
  );
>>>>>>> Add option list and plate list component
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#000000",
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
  optionList: {},
});

export default SettingScreen;

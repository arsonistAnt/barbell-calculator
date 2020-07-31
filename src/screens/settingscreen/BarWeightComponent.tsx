import React, { useState } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import IncrementButton from "../../components/button/IncrementButton";

const BarWeightComponent: React.FC = () => {
  const [barWeight, changeBarWeight] = useState(45);
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.barWeightText, { marginRight: 12 }]}>
          {barWeight}
        </Text>
        <IncrementButton
          onIncrementPressed={() => changeBarWeight(barWeight - 5)}
          onDecrementPressed={() => changeBarWeight(barWeight + 5)}
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

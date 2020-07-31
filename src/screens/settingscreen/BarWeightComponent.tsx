import React, { useState } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BarWeightComponent: React.FC = () => {
  const [barWeight, changeBarWeight] = useState(45);
  return (
    <>
      <View style={{ flexDirection: "row" }}>
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

const styles = StyleSheet.create({
  barWeightText: {
    color: "#FFFFFF",
    marginHorizontal: 4,
    fontSize: 22,
  },
});

export default BarWeightComponent;

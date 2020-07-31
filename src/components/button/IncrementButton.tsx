import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

type IncrementProps = {
  // Function call back for the increment and decrement buttons.
  onDecrementPressed: () => void;
  onIncrementPressed: () => void;
};

/**
 *  Increment/Decrement button component.
 */
const IncrementButton: React.FC<IncrementProps> = ({
  onDecrementPressed,
  onIncrementPressed,
}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="#616161"
        activeOpacity={0.95}
        style={styles.minusBtn}
        onPress={() => onDecrementPressed()}
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
        style={styles.plusBtn}
        onPress={() => onIncrementPressed()}
      >
        <Entypo name="plus" size={20} color="black" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#222222",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 90,
  },
  minusBtn: {
    borderRadius: 8,
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  plusBtn: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
  },
});

export default IncrementButton;

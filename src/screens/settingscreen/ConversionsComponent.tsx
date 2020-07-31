import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ConversionsComponent = () => {
  const [toggle, toggleType] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => toggleType(!toggle)}
        style={styles.container}
      >
        <Text style={styles.weightTypeText}>{toggle ? "Kg" : "Lb"}</Text>
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

const styles = StyleSheet.create({
  container: {
    marginRight: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  weightTypeText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default ConversionsComponent;

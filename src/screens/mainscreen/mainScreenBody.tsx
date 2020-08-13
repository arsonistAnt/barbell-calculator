import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Body: FunctionComponent = ({ calculatedPlates }) => {
  const isLeftoverWeight = () => {
    if (
      calculatedPlates.leftoverWeight < 0 ||
      isNaN(calculatedPlates.leftoverWeight)
    ) {
      return false;
    } else if (calculatedPlates.leftoverWeight >= 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.weightText}>
        {calculatedPlates.plates === undefined ? (
          <Text></Text>
        ) : (
          calculatedPlates.plates.map((item, index) => (
            <Text key={index}>
              {item.amount +
                " x " +
                item.type +
                " => " +
                item.amount * item.type +
                "LB\n"}
            </Text>
          ))
        )}
      </Text>

      {!isLeftoverWeight() ? (
        <Text style={styles.remainingText}>Not Rackable</Text>
      ) : (
        <Text style={styles.remainingText}>
          Remaining: {calculatedPlates.leftoverWeight}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  weightText: {
    fontSize: 25,
    color: "white",
  },
  remainingText: {
    fontSize: 25,
    color: "white",
    paddingTop: 100,
  },
});

export default Body;

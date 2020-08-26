import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useTheme } from "react-native-paper";

const Body: FunctionComponent = ({ calculatedPlates }) => {
  // Retrieve the styles with the current theme of the application.
  const styles = stylesWithTheme(useTheme());
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

const stylesWithTheme = (theme: ReactNativePaper.Theme) => {
  const { fonts, colors } = theme;
  return StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: 50,
    },
    weightText: {
      ...fonts.light,
      fontSize: 25,
      color: "white",
    },
    remainingText: {
      ...fonts.regular,
      fontSize: 25,
      color: "white",
      paddingTop: 100,
    },
  });
};

export default Body;

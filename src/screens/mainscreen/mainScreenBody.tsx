import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import PlateResultTable from "./plateResultTable";

/**
 * The body component for the main screen, displays the plate results in a table.
 */
const Body: React.FC<any> = ({ calculatedPlates }) => {
  const { leftoverWeight, plates } = calculatedPlates;
  const appTheme = useTheme();
  const styles = stylesWithTheme(appTheme);
  return (
    <View style={styles.container}>
      <PlateResultTable plates={plates} appTheme={appTheme} />
    </View>
  );
};

/**
 * Creates the style for the main body component utilizing the react native paper theme.
 *
 * @param theme the theme from react native paper.
 */
const stylesWithTheme = (theme: ReactNativePaper.Theme) => {
  const { fonts, colors } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingBottom: 16,
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

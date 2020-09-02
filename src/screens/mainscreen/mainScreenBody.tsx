import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme, Badge } from "react-native-paper";
import { Plate } from "../../utils/PlateCalculation";
import {
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

/**
 * The body component for the main screen, displays the plate results in a table.
 */
const Body: React.FC<any> = ({ calculatedPlates }) => {
  const { leftoverWeight, plates } = calculatedPlates;
  const { colors } = useTheme();
  const styles = stylesWithTheme(useTheme());
  return (
    <View style={styles.container}>
      <PlateResultTable />
    </View>
  );
};

const PlateResultTable = () => {
  const appTheme = useTheme();
  const { colors } = appTheme;
  const styles = tableStylesWithTheme(appTheme);
  const ColumnBorderOverlay = () => {
    return (
      <View style={styles.columnOverlay}>
        <View style={{ flex: 6 }} />
        <View
          style={{
            flex: 4,
            borderLeftColor: colors.borderColor,
            borderLeftWidth: 1,
          }}
        />
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 6, alignItems: "center" }}>
          <Text>Plates per side</Text>
        </View>
        <View
          style={{
            flex: 4,
            alignItems: "center",
          }}
        >
          <Text>Total</Text>
        </View>
      </View>
    );
  };

  const EX_DATA = [
    { amount: 1, plateType: 45 },
    { amount: 3, plateType: 15 },
    { amount: 4, plateType: 20 },
    { amount: 2, plateType: 10 },
    { amount: 1, plateType: 11 },
    { amount: 1, plateType: 13 },
    { amount: 1, plateType: 14 },
    { amount: 1, plateType: 222 },
    { amount: 1, plateType: 213 },
    { amount: 1, plateType: 3 },
    { amount: 1, plateType: 44 },
  ];

  const renderPlateItem = ({ item: plateItem }) => {
    return (
      <>
        <View style={styles.item}>
          <Text style={{ flex: 6, fontSize: 80 }}>{plateItem.amount}</Text>
          <Text style={{ flex: 4, fontSize: 80, textAlign: "center" }}>
            {plateItem.plateType}
          </Text>
        </View>
      </>
    );
  };

  const PlateResultsBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}
          overScrollMode="never"
          keyExtractor={(item) => `${item.plateType}`}
          data={EX_DATA}
          renderItem={renderPlateItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.tableContainer}>
      <ColumnBorderOverlay />
      <Header />

      <PlateResultsBody />
    </View>
  );
};

/**
 * Displays plates
 * @param plates The plates from calculatedPlates.
 * //TODO:- Display KG after finishing UI
 */
const displayPlateResults = (plates?: Array<Plate>) => {
  const appTheme = useTheme();
  const { weightText } = stylesWithTheme(appTheme);
  return plates?.map((plate) => {
    return (
      <Text style={weightText} key={plate.type}>
        {plate.amount} x {plate.type}
      </Text>
    );
  });
};

/**
 * Displays leftoverweight
 * @param leftoverWeight The remainder weight from calculatedPlates.
 */
const displayLeftOverWeight = (leftoverWeight: number) => {
  const styles = stylesWithTheme(useTheme());
  if (leftoverWeight >= 0) {
    return (
      <Text style={styles.remainingText}>Remaining: {leftoverWeight}</Text>
    );
  } else {
    return <Text style={styles.remainingText}>Not Rackable</Text>;
  }
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

const tableStylesWithTheme = (theme: ReactNativePaper.Theme) => {
  const { fonts, colors } = theme;
  return StyleSheet.create({
    tableContainer: {
      flex: 1,
      backgroundColor: colors.accent,
      borderRadius: 8,
    },
    tableHeader: {
      ...fonts.medium,
      color: "white",
      fontSize: 25,
    },
    headerContainer: {
      flex: 12,
      flexDirection: "row",
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 1,
    },
    columnOverlay: {
      position: "absolute",
      flexDirection: "row",
      bottom: 0,
      top: 0,
      right: 0,
      left: 0,
    },
    bodyContainer: {
      flex: 88,
    },
    item: {
      flexDirection: "row",
    },
  });
};

export default Body;

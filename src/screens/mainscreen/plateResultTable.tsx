import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { Badge } from "react-native-paper";
import { Plate } from "../../utils/PlateCalculation";
import { FlatList } from "react-native-gesture-handler";

// Use to add on additional radius size of the badge in for the items in the Plate Table Body component.
const badgeRadiusOffset = 10;

type PlateTableProps = {
  plates: Array<Plate>;
  appTheme: ReactNativePaper.Theme;
};

type PlateTableBodyProps = {
  plates: Array<Plate>;
  bodyContainerStyle?: StyleProp<ViewStyle>;
  plateItemStyle?: StyleProp<ViewStyle>;
  appTheme: ReactNativePaper.Theme;
};

type HeaderProps = {
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  headerBorderColor?: string;
};

type ColumnOverlayProps = {
  columnContainerStyle?: ViewStyle;
  columnBorderColor?: string;
};

/**
 * Header component for the plate result table, displays two columns with the headers: "Plates per side" & "Total"
 */
const Header: FC<HeaderProps> = ({ headerContainerStyle, headerTextStyle }) => {
  const { totalHeaderContainer, platePerSideHeaderContainer } = HeaderStyles;
  return (
    <View style={headerContainerStyle}>
      <View style={platePerSideHeaderContainer}>
        <Text style={headerTextStyle}>Plates per side</Text>
      </View>
      <View style={totalHeaderContainer}>
        <Text style={headerTextStyle}>Total</Text>
      </View>
    </View>
  );
};

/**
 * A column border between the two header columns, it uses absolute positioning to overlay
 * over the rest of the table components.
 */
const ColumnBorderOverlay: FC<ColumnOverlayProps> = ({
  columnContainerStyle,
  columnBorderColor,
}) => {
  return (
    <View style={columnContainerStyle}>
      <View style={{ flex: 6 }} />
      <View
        style={{
          flex: 4,
          borderLeftColor: columnBorderColor,
          borderLeftWidth: 1,
        }}
      />
    </View>
  );
};

/**
 * Displays the plate results in a flat list, some item attributes styles are based on the app theme.
 */
const PlateResultBody: FC<PlateTableBodyProps> = ({
  plates,
  plateItemStyle,
  bodyContainerStyle,
  appTheme,
}) => {
  const {
    plateAmountText,
    perSideContainer,
    perSideItemCol,
    totalAmountContainer,
    plateTypeText,
    plateTotalText,
  } = tableBodyStylesWithTheme(appTheme);
  const renderPlateItem = (plateItem: Plate) => {
    return (
      <>
        <View style={plateItemStyle}>
          <View style={perSideContainer}>
            <View style={perSideItemCol}>
              <Badge
                style={{
                  ...plateAmountText,
                  backgroundColor: appTheme.colors.primary,
                }}
                visible={true}
                size={plateAmountText.fontSize + badgeRadiusOffset}
              >
                {plateItem.amount}
              </Badge>
              <Text style={plateTypeText}> x </Text>
              <Text style={plateTypeText}>{plateItem.type}</Text>
            </View>
          </View>
          <View style={totalAmountContainer}>
            <Text style={plateTotalText}>
              {plateItem.type * plateItem.amount}
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={bodyContainerStyle}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
        overScrollMode="never"
        keyExtractor={(item) => `${item.type}`}
        data={plates}
        renderItem={({ item }) => {
          return renderPlateItem(item);
        }}
      />
    </View>
  );
};

/**
 * The table component that containers Header, ColumnBorderOverlay, and PlateResultBody components.
 */
const PlateResultTable: FC<PlateTableProps> = (props): JSX.Element => {
  const { appTheme, plates } = props;
  const styles = tableStylesWithTheme(appTheme);
  const columnBorderColor = appTheme.colors.borderColor;

  return (
    <>
      <View style={styles.tableContainer}>
        <Header
          headerTextStyle={styles.tableHeaderText}
          headerContainerStyle={styles.headerContainer}
        />
        <ColumnBorderOverlay
          columnContainerStyle={styles.columnOverlay}
          columnBorderColor={columnBorderColor}
        />
        <PlateResultBody
          plates={plates}
          appTheme={appTheme}
          bodyContainerStyle={styles.bodyContainer}
          plateItemStyle={styles.item}
        />
      </View>
    </>
  );
};

// Styles for the PlateResultTable components.
const tableStylesWithTheme = (theme: ReactNativePaper.Theme) => {
  const { fonts, colors } = theme;
  return StyleSheet.create({
    tableContainer: {
      flex: 1,
      backgroundColor: colors.accent,
      borderRadius: 8,
    },
    tableHeaderText: {
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
      marginVertical: 16,
    },
  });
};

// Styles for the Header component
const HeaderStyles = StyleSheet.create({
  totalHeaderContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  platePerSideHeaderContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Styles for the table Body component
const tableBodyStylesWithTheme = (appTheme: ReactNativePaper.Theme) => {
  const { fonts } = appTheme;
  return StyleSheet.create({
    perSideItemCol: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "55%",
    },
    perSideContainer: {
      flexDirection: "row",
      flex: 6,
      fontSize: 80,
      justifyContent: "center",
    },
    totalAmountContainer: {
      flexDirection: "row",
      flex: 4,
      fontSize: 80,
      justifyContent: "center",
    },
    plateAmountText: {
      ...fonts.light,
      color: "white",
      fontSize: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    plateTypeText: { ...fonts.light, color: "white", fontSize: 30 },
    plateTotalText: { ...fonts.light, color: "white", fontSize: 30 },
  });
};

export default PlateResultTable;

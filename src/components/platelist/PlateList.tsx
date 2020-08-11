import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PlateListSeparator from "../ItemListSeparator";
import { PlateConfig, Plate } from "../../utils/PlateCalculation";
import { MaterialIcons } from "@expo/vector-icons";
import IncrementButton from "../../components/button/IncrementButton";

// Prop-Type enforcement for the components in this module.
type PlateListProps = {
  plateConfiguration: PlateConfig;
  currentSelection: Set<number>;
  onUpdateCurrentSelection?: (selection: Set<number>) => void;
  onIncrementUpdate?: (plate: Plate, newAmount: number) => void;
  useLimitedPlates: boolean;
};

type PlateIncrementerProps = {
  plate: Plate;
  onAmountUpdate?: (plate: Plate, newAmount: number) => void;
};
// Prop-Type enforcement for the components in this module.

/**
 * The incrementer component for the amount of plates available for each PlateItem
 */
const PlateIncrementerComponent: React.FC<PlateIncrementerProps> = ({
  plate,
  onAmountUpdate,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={[styles.plateNumberText, { marginRight: 12 }]}>
        {plate.amount}
      </Text>
      <IncrementButton
        onIncrementPressed={() => onAmountUpdate?.(plate, plate.amount + 1)}
        onDecrementPressed={() => onAmountUpdate?.(plate, plate.amount - 1)}
      />
    </View>
  );
};

/**
 * Returns a checkmark component if the plate is selected or null component if it isn't.
 *
 * @param plate The current plate that has been tapped on.
 * @param selectedPlates The set of plates that have been already selected.
 */
const showCheckMark = (plate: Plate, selectedPlates: Set<number>) => {
  if (selectedPlates.has(plate.type)) {
    return <MaterialIcons name="check" size={24} color="red" />;
  } else {
    return null;
  }
};

/**
 * Handles removing plates from the current selection set.
 *
 * @param plate The plate that has been tapped on.
 * @param selectedPlates The set currently selected plates.
 * @param action A callback function for when the selection set has changed.
 */
const handleSelection = (
  plate: Plate,
  selectedPlates: Set<number>,
  action?: (plate: Set<number>) => void
) => {
  if (selectedPlates.has(plate.type)) {
    let newSet = new Set(
      [...selectedPlates].filter((plateType) => plateType != plate.type)
    );
    action?.(newSet);
  } else {
    // remove plate from the selected set.
    let newSet = new Set([...selectedPlates, plate.type]);
    action?.(newSet);
  }
};

/**
 * Display weighted plates in a list, handles components like plate selection and plate amounts.
 *
 * @param plateConfiguration the PlateConfig that will be used to display what kind of plates are available.
 */
export const PlateList: React.FC<PlateListProps> = ({
  currentSelection,
  plateConfiguration,
  onUpdateCurrentSelection,
  onIncrementUpdate,
  useLimitedPlates: custom,
}) => {
  const { availablePlates } = plateConfiguration;

  const PlateItem = (plate: Plate, customMode: boolean) => {
    return (
      <TouchableOpacity
        onPress={() =>
          handleSelection(plate, currentSelection, onUpdateCurrentSelection)
        }
        disabled={customMode}
        style={styles.container}
      >
        <Text style={styles.plateText}>{plate.type} lb</Text>
        {customMode ? (
          <PlateIncrementerComponent
            plate={plate}
            onAmountUpdate={onIncrementUpdate}
          />
        ) : (
          showCheckMark(plate, currentSelection)
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={availablePlates.sort((a, b) => b.type - a.type)}
        ItemSeparatorComponent={PlateListSeparator}
        ListHeaderComponent={PlateListSeparator}
        ListFooterComponent={PlateListSeparator}
        renderItem={({ item: plate }) => {
          return <>{PlateItem(plate, custom)}</>;
        }}
        keyExtractor={(plate) => `${plate.type}`}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 8,
  },
  plateText: {
    color: "white",
    fontSize: 20,
  },
  plateNumberText: {
    color: "white",
    fontSize: 22,
  },
});

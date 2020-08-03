import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PlateListSeparator from "../ItemListSeparator";
import { PlateConfig, Plates } from "../../utils/PlateCalculation";
import { MaterialIcons } from "@expo/vector-icons";
import IncrementButton from "../../components/button/IncrementButton";

type PlateListProps = {
  plateConfiguration: PlateConfig;
  custom: boolean;
};

type PlateIncrementerProps = {
  amount: number;
};

/**
 * The incrementer component for the amount of plates available for each DefaultPlateItem
 */
const IncrementerComponent: React.FC<PlateIncrementerProps> = ({ amount }) => {
  const [currAmount, changeAmount] = useState(amount);

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={[styles.plateNumberText, { marginRight: 12 }]}>
        {currAmount}
      </Text>
      <IncrementButton
        onIncrementPressed={() => changeAmount(currAmount + 1)}
        onDecrementPressed={() => changeAmount(currAmount - 1)}
      />
    </View>
  );
};

/**
 * Returns a checkmark component if the plate is selected or null component if it isn't.
 *
 * @param plates The current plate that has been tapped on.
 * @param selectedPlates The set of plates that have been already selected.
 */
const showCheckMark = (plates: Plates, selectedPlates: Set<Plates>) => {
  if (selectedPlates.has(plates)) {
    return <MaterialIcons name="check" size={24} color="red" />;
  } else {
    return null;
  }
};

/**
 * Display weighted plates in a list.
 *
 * @param plateConfiguration the PlateConfig that will be used to display what kind of plates are available.
 */
export const PlateList: React.FC<PlateListProps> = ({
  plateConfiguration,
  custom,
}) => {
  const { availablePlates } = plateConfiguration;
  const [selectedPlates, updateSelection] = useState(new Set<Plates>());
  // TODO: Pre-checked plates should be passed as a prop.
  // This sets the default checked plates to this list.
  useEffect(() => {
    const defaultSelection = availablePlates.filter((plate) =>
      [45, 35, 25, 10, 5, 2.5].includes(plate.type)
    );
    updateSelection(new Set(defaultSelection));
  }, [plateConfiguration]);

  const handleSelection = (plates: Plates) => {
    if (selectedPlates.has(plates)) {
      let newSet = new Set(
        [...selectedPlates].filter((x) => x.type != plates.type)
      );
      updateSelection(newSet);
    } else {
      // remove plate from the selected set.
      let newSet = new Set([...selectedPlates, plates]);
      updateSelection(newSet);
    }
  };

  const DefaultPlateItem = (plate: Plates, customMode: boolean) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelection(plate)}
        disabled={customMode}
        style={styles.container}
      >
        <Text style={styles.plateText}>{plate.type} lb</Text>
        {customMode ? (
          <IncrementerComponent amount={0} />
        ) : (
          showCheckMark(plate, selectedPlates)
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={availablePlates}
        ItemSeparatorComponent={PlateListSeparator}
        ListHeaderComponent={PlateListSeparator}
        ListFooterComponent={PlateListSeparator}
        renderItem={({ item: plate }) => {
          return <>{DefaultPlateItem(plate, custom)}</>;
        }}
        keyExtractor={(plate) => `${plate.type}`}
      />
    </>
  );
};

// Style objects for the plate list function component.
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

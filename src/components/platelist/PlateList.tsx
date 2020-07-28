import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PlateListSeparator from "../ItemListSeparator";
import {
  PlateConfig,
  DefaultPlateConfig,
  Plates,
} from "../../utils/PlateCalculation";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * A list of predifined properties for the PlateList component.
 */
type PlateListProps = {
  plateConfiguration: PlateConfig;
};

/**
 * Display weighted plates in a list.
 *
 * @param plateConfiguration the PlateConfig that will be used to display what kind of plates are available.
 */
export const PlateList: React.FC<PlateListProps> = ({ plateConfiguration }) => {
  const { availablePlates } = plateConfiguration;
  // Keep track of selected plates.
  const [selectedPlates, updateSelection] = useState(new Set<Plates>());
  const showCheckMark = (plates: Plates) => {
    if (selectedPlates.has(plates)) {
      return <MaterialIcons name="check" size={24} color="red" />;
    } else {
      return null;
    }
  };
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

  return (
    <>
      <FlatList
        data={availablePlates}
        ItemSeparatorComponent={PlateListSeparator}
        ListHeaderComponent={PlateListSeparator}
        ListFooterComponent={PlateListSeparator}
        renderItem={({ item: plate }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => handleSelection(plate)}
                style={styles.container}
              >
                <Text style={styles.plateText}>{plate.type} lb</Text>
                {showCheckMark(plate)}
              </TouchableOpacity>
            </>
          );
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
    paddingVertical: 16,
    marginHorizontal: 8,
  },
  plateText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

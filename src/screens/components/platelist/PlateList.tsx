import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import PlateListSeparator from "../ItemListSeparator";
import {
  PlateConfig,
  DefaultPlateConfig,
} from "../../../utils/PlateCalculation";

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
  // By default the DefaultPlateConfig.availablePlates is sorted from least to greatest so we must check
  // if we have to reverse the array to display the list of available plates from greatest to least.
  const isDefaultPlateConfig = plateConfiguration instanceof DefaultPlateConfig;
  const { availablePlates } = plateConfiguration;

  return (
    <>
      <FlatList
        data={
          isDefaultPlateConfig ? availablePlates.reverse() : availablePlates
        }
        ItemSeparatorComponent={PlateListSeparator}
        ListHeaderComponent={PlateListSeparator}
        ListFooterComponent={PlateListSeparator}
        renderItem={({ item: plate }) => {
          return (
            <>
              <View style={styles.container}>
                <Text style={styles.plateText}>{plate.type} lb</Text>
              </View>
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
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  plateText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

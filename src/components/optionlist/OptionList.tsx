import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import OptionItemSeparator from "../ItemListSeparator";

/**
 * A list of predifined properties for the OptionsList component.
 */
type OptionsListProps = {
  // An array of OptionItem's for the flat list data prop in the OptionList FC.
  optionItemList: Array<OptionItem>;
};

/**
 * OptionItem's are pre-defined subcomponents for the OptionsList's functioncal component.
 * @see OptionsList
 */
export class OptionItem {
  id: number;
  optionLabel: String;
  itemComponent: React.FC;

  constructor(id: number, label: String, itemComponent: React.FC) {
    this.id = id;
    this.optionLabel = label;
    this.itemComponent = itemComponent;
  }
}

/**
 * Displays options and buttons in a flat list, this functional component takes in a array of OptionItem's
 * to render.
 *
 * @param optionItemList the list of OptionItem's to render in the flat list.
 * @see OptionItem
 */
export const OptionsList: React.FC<OptionsListProps> = ({ optionItemList }) => {
  return (
    <FlatList
      data={optionItemList}
      bounces={false}
      ItemSeparatorComponent={OptionItemSeparator}
      ListHeaderComponent={OptionItemSeparator}
      ListFooterComponent={OptionItemSeparator}
      renderItem={({ item: optionItem }) => {
        return (
          <>
            <View style={styles.optionItemContainer}>
              <Text style={styles.optionLabel}>{optionItem.optionLabel}</Text>
              {<optionItem.itemComponent />}
            </View>
          </>
        );
      }}
      keyExtractor={(optionItem) => `${optionItem.id}`}
    />
  );
};

// OptionList style objects
const styles = StyleSheet.create({
  optionItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingVertical: 16,
    marginHorizontal: 8,
  },
  optionLabel: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

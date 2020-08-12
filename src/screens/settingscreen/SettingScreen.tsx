import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text,
  TouchableHighlight,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  OptionsList,
  OptionItem,
} from '../../components/optionlist/OptionList';
import { Plate } from '../../utils/PlateCalculation';
import { PlateList } from '../../components/platelist/PlateList';
import BarWeightComponent from './BarWeightComponent';
import ConversionsComponent from './ConversionsComponent';
import LimitedPlatesComponent from './LimitedPlatesComponent';
import { Context as SettingsContext } from '../../context/SettingsContext';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

// Create list of options for our options list.
const optionItems: Array<OptionItem> = [
  {
    id: 0,
    optionLabel: 'Unit',
    itemComponent: ConversionsComponent,
  },
  {
    id: 1,
    optionLabel: 'Bar weight',
    itemComponent: BarWeightComponent,
  },
  {
    id: 3,
    optionLabel: 'Limited number of plates',
    itemComponent: LimitedPlatesComponent,
  },
];

/**
 * Automatically save the calculation settings when navigating away from the settings screen.
 *
 * @param navigation the navigation prop to hook listeners into.
 * @param action the callback for when the setting screen is blurred.
 */
const setupAutoSave = (
  navigation: StackNavigationProp<any, any>,
  action?: () => void
) => {
  // Save settings when navigating away from settings screen.
  useEffect(() => {
    const unsubscribeListener: any = navigation.addListener('blur', () => {
      console.log('BYE SCREEN!');
      action?.();
      return unsubscribeListener;
    });
    return;
  }, []);
};

const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const settingsState = useContext(SettingsContext);
  const { state: userSettings, dispatch } = settingsState;
  setupAutoSave(navigation, () => {
    dispatch({ type: 'save_user_settings' });
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <SectionList
            sections={[
              {
                title: '',
                data: [''],
                renderItem: () => (
                  <TouchableHighlight>
                    <OptionsList optionItemList={optionItems} />
                  </TouchableHighlight>
                ),
              },
              {
                title: '',
                data: [''],
                renderItem: () => (
                  <TouchableHighlight>
                    <PlateList
                      plateConfiguration={userSettings.plateConfig}
                      custom={userSettings.customMode}
                      currentSelection={userSettings.checkedPlateTypes}
                      onUpdateCurrentSelection={(
                        availableTypes: Set<number>
                      ) => {
                        dispatch({
                          type: 'update_checked_plates',
                          newTypeSet: availableTypes,
                        });
                      }}
                      onIncrementUpdate={(plate: Plate, amount: number) => {
                        plate.amount = amount;
                        dispatch({
                          type: 'update_plate_amount',
                          newPlate: plate,
                        });
                      }}
                    />
                  </TouchableHighlight>
                ),
              },
            ]}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section: { title } }) => (
              <Text>{title}</Text>
            )}
          />
          <View style={{ marginVertical: 16 }} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#171717',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default SettingScreen;

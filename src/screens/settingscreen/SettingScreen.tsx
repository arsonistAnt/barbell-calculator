import React, { useContext, useEffect, FunctionComponent } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text,
  TouchableHighlight,
  Platform,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  OptionsList,
  OptionItem,
} from '../../components/optionlist/OptionList';
import { Plate, DefaultPlateConfig } from '../../utils/PlateCalculation';
import { PlateList } from '../../components/platelist/PlateList';
import BarWeightComponent from './BarWeightComponent';
import ConversionsComponent from './ConversionsComponent';
import LimitedPlatesComponent from './LimitedPlatesSwitch';
import {
  Context as SettingsContext,
  getCurrentPlateTypeConfig,
} from '../../context/SettingsContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme, Appbar } from 'react-native-paper';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const resetComponent: FunctionComponent = () => {
  const settingsState = useContext(SettingsContext);
  const { dispatch } = settingsState;
  return (
    <TouchableOpacity
      style={{ alignSelf: 'flex-start' }}
      onPress={() => {
        Alert.alert(
          'Default Plates',
          'Do you really want to reset?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => dispatch({ type: 'restore_to_default_settings' }),
            },
          ],
          { cancelable: true }
        );
      }}
    >
      <Text style={styles.itemText}>Reset to default</Text>
    </TouchableOpacity>
  );
};

/**
 * Create the app bar header component for the settings screen.
 */
const SettingsScreenAppBar: React.FC<Props> = ({ navigation }) => {
  // Get the apptitle and title size from the theme prop.
  const { colors } = useTheme();
  const iosFontSize = Platform.OS == 'ios' ? { fontSize: 20 } : {};
  const onNavigateBackPressed = () => {
    navigation.navigate('Plate Calculator');
  };
  const BackActionIos = () => (
    <Appbar.Action
      icon="ios-arrow-back"
      color="white"
      size={20}
      onPress={onNavigateBackPressed}
      style={{ justifyContent: 'flex-end' }}
    />
  );
  return (
    <Appbar.Header style={{ backgroundColor: colors.accent }}>
      {Platform.OS == 'ios' ? (
        <BackActionIos />
      ) : (
        <Appbar.BackAction onPress={onNavigateBackPressed} />
      )}
      <Appbar.Content title={'Settings'} titleStyle={{ ...iosFontSize }} />
    </Appbar.Header>
  );
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
  {
    id: 4,
    optionLabel: undefined,
    itemComponent: resetComponent,
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
      action?.();
      return unsubscribeListener;
    });
    return;
  }, []);
};

const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const settingsState = useContext(SettingsContext);
  const { state, dispatch } = settingsState;
  const plateConfig = getCurrentPlateTypeConfig(state);
  // Auto save when user navigates away from settings screen.
  setupAutoSave(navigation, () => {
    dispatch({ type: 'save_user_settings' });
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SettingsScreenAppBar navigation={navigation} />
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
                      plateConfiguration={plateConfig}
                      useLimitedPlates={plateConfig.useLimitedPlates}
                      currentSelection={plateConfig.selectedPlates}
                      onUpdateCurrentSelection={(
                        selectedPlates: Set<number>
                      ) => {
                        dispatch({
                          type: 'update_plate_config',
                          newPlateConfig: {
                            ...plateConfig,
                            selectedPlates,
                          } as DefaultPlateConfig,
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

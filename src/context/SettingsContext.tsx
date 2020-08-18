import React, { createContext, useReducer, useEffect } from "react";
import AsynStorage from "@react-native-community/async-storage";
import StorageKeys, { setToJsonReplacer } from "../utils/StorageKeys";
import {
  Plate,
  DefaultPlateConfig,
  PlateConfig,
  PlateConfigFactory,
  WeightConversions,
} from "../utils/PlateCalculation";

/**
 * Type restriction that contains all calculation settings for the barbell calculator.
 */
export interface CalculationSettings {
  kgConfig: DefaultPlateConfig;
  lbConfig: DefaultPlateConfig;
  // The current selected weight type.
  currentWeightType: WeightConversions;
}

/**
 * Types of actions relative to user settings.
 */
type PlateConfigAction =
  | { type: "update_current_config_type"; weightType: WeightConversions }
  | {
      type: "update_plate_config";
      newPlateConfig: PlateConfig;
    }
  | { type: "update_plate_amount"; newPlate: Plate };

type SettingStorageAction =
  | { type: "save_user_settings" }
  | { type: "restore_to_default_settings" }
  | { type: "update_user_settings"; updatedSettings: CalculationSettings };

type SettingActionTypes = PlateConfigAction | SettingStorageAction;

/**
 * Interface that describes the types of data that will be in the settings provider.
 */
interface SettingsContextProp {
  state: CalculationSettings;
  dispatch: React.Dispatch<SettingActionTypes>;
}

/**
 * This reducer is mainly used to update the settings for the barbell calculation.
 *
 * @param state the CalculationSettings object
 * @param action the action type and payload object used to update the current state of the settings.
 */
const settingsReducer = (
  state: CalculationSettings,
  action: SettingActionTypes
): CalculationSettings => {
  switch (action.type) {
    case "update_plate_config":
      return getUpdatedPlateConfig(state, action.newPlateConfig);
    case "update_plate_amount":
      const currConfig = getCurrentPlateTypeConfig(state);
      const newConfig = updateConfigPlateAmount(currConfig, action.newPlate);
      return getUpdatedPlateConfig(state, newConfig);
    case "save_user_settings":
      saveSettings(state);
      return state;
    case "update_user_settings":
      return action.updatedSettings;
    case "restore_to_default_settings":
      return constructDefaultSettings(configFactory);
    case "update_current_config_type":
      return { ...state, currentWeightType: action.weightType };
    default:
      return state;
  }
};

/**
 * A helper function that returns the plate configuration based on the currentWeightType stored
 * in the userSettings object.
 * @param userSettings The CalculationSettings object that is used to determine the current plate configuration selected by the user.
 */
export const getCurrentPlateTypeConfig = (
  userSettings: CalculationSettings
): DefaultPlateConfig => {
  switch (userSettings.currentWeightType) {
    case WeightConversions.Kilograms:
      return userSettings.kgConfig;
    case WeightConversions.Pounds:
      return userSettings.lbConfig;
  }
};

/**
 * A helper function to construct a new state with an updated plate configuration object.
 */
const getUpdatedPlateConfig = (
  currState: CalculationSettings,
  newPlateConfig: PlateConfig
) => {
  // Determine which type of config needs to be updated.
  switch (newPlateConfig.conversionType) {
    case WeightConversions.Pounds:
      return { ...currState, lbConfig: newPlateConfig as DefaultPlateConfig };
    default:
      return { ...currState, kgConfig: newPlateConfig as DefaultPlateConfig };
  }
};

/**
 * A helper function that updates PlateConfig's plate amount.
 *
 * @param currPlateConfig The current plate configuration that will be updated.
 * @param newPlateState The new plate that will be used to update the available plates in the currPlateConfig
 */
const updateConfigPlateAmount = (
  currPlateConfig: PlateConfig,
  newPlateState: Plate
): PlateConfig => {
  const updateIndex = currPlateConfig.standardPlates.findIndex(
    (plate) => plate.type == newPlateState.type
  );
  currPlateConfig.standardPlates[updateIndex].amount = newPlateState.amount;
  return currPlateConfig;
};

/**
 * Asynchronously saves the CalculationSettings object into persistent storage.
 *
 * @param currSettings The current setting's object to save into storage.
 */
const saveSettings = async (currSettings: CalculationSettings) => {
  try {
    const settingsJson = JSON.stringify(currSettings, setToJsonReplacer);
    await AsynStorage.setItem(StorageKeys.UserSettings, settingsJson);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Asynchronously fetch user settings from the storage.
 *
 * @return a Promise of type CalculationSettings.
 */
const getSettingsPersistent = async (): Promise<CalculationSettings> => {
  const storedSettings = await AsynStorage.getItem(StorageKeys.UserSettings);

  if (storedSettings != null) {
    const parsedSettings: CalculationSettings = JSON.parse(storedSettings);
    // Properties for the plate configs in the storage needs to be re-initialized.
    parsedSettings.lbConfig = new DefaultPlateConfig(parsedSettings.lbConfig);
    parsedSettings.kgConfig = new DefaultPlateConfig(parsedSettings.kgConfig);

    return parsedSettings;
  }
  return constructDefaultSettings(configFactory);
};

/**
 * Returns a default initialized CalculationSettings object.
 *
 * @returns A CalculationSettings object.
 */
const constructDefaultSettings = (
  configFactory: PlateConfigFactory
): CalculationSettings => {
  const kgConfig = configFactory.getDefaultConfig(WeightConversions.Kilograms);
  const lbConfig = configFactory.getDefaultConfig(WeightConversions.Pounds);
  return {
    lbConfig,
    kgConfig,
    currentWeightType: WeightConversions.Pounds,
  };
};

// Create plate config factory
const configFactory = new PlateConfigFactory();
// Setup for the settings provider
const defaultSettings = {} as SettingsContextProp;
const Context = createContext(defaultSettings);
const { Provider } = Context;

/**
 * Provides any requesting children the settings data.
 */
const SettingsProvider: React.FunctionComponent = ({ children }) => {
  // Create the default settings state and setup the reducer.
  const [state, dispatch] = useReducer(
    settingsReducer,
    constructDefaultSettings(configFactory)
  );
  // Run when user first launches app.
  useEffect(() => {
    // Get the stored user settings and update it to the current state.
    getSettingsPersistent().then((userSettings: CalculationSettings) => {
      dispatch({ type: "update_user_settings", updatedSettings: userSettings });
    });
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Context, SettingsProvider };

import React, { createContext, useReducer, useEffect } from "react";
import AsynStorage from "@react-native-community/async-storage";
import StorageKeys, { setToJsonReplacer } from "../utils/StorageKeys";
import {
  Plate,
  DefaultPlateConfig,
  PlateConfig,
} from "../utils/PlateCalculation";

/**
 * Type restriction that contains all calculation settings for the barbell calculator.
 */
export interface CalculationSettings {
  // Boolean to check if custom plate numbers should be used.
  plateConfig: DefaultPlateConfig;
}

/**
 * Types of actions relative to user settings.
 */
type PlateConfigAction =
  | {
      type: "update_plate_config";
      newPlateConfig: PlateConfig;
    }
  | { type: "update_plate_amount"; newPlate: Plate };

type SettingStorageAction =
  | { type: "save_user_settings" }
  | { type: "restore_to_default_settings" }
  | { type: "update_user_settings"; updatedSettings: CalculationSettings };

/**
 * Interface that describes the types of data that will be in the settings provider.
 */
interface SettingsContextProp {
  state: CalculationSettings;
  dispatch: React.Dispatch<PlateConfigAction | SettingStorageAction>;
}

/**
 * This reducer is mainly used to update the settings for the barbell calculation.
 *
 * @param state the CalculationSettings object
 * @param action the action type and payload object used to update the current state of the settings.
 */
const settingsReducer = (
  state: CalculationSettings,
  action: PlateConfigAction | SettingStorageAction
) => {
  switch (action.type) {
    case "update_plate_config":
      return { ...state, plateConfig: action.newPlateConfig };
    case "update_plate_amount":
      const newConfig = updateConfigPlateAmount(
        state.plateConfig,
        action.newPlate
      );
      return { ...state, plateConfig: newConfig };
    case "save_user_settings":
      saveSettings(state);
      return state;
    case "update_user_settings":
      return action.updatedSettings;
    case "restore_to_default_settings":
      return constructDefaultSettings();
    default:
      return state;
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
  const updateIndex = currPlateConfig.availablePlates.findIndex(
    (plate) => plate.type == newPlateState.type
  );
  currPlateConfig.availablePlates[updateIndex].amount = newPlateState.amount;
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
 *
 */
const getSettingsPersistent = async (): Promise<CalculationSettings> => {
  const storedSettings = await AsynStorage.getItem(StorageKeys.UserSettings);

  if (storedSettings != null) {
    const parsedSettings: CalculationSettings = JSON.parse(storedSettings);
    // Revert the checkedPlateTypes property back to a set.
    parsedSettings.plateConfig.selectedPlates = new Set<number>(
      parsedSettings.plateConfig.selectedPlates
    );

    return parsedSettings;
  }
  return constructDefaultSettings();
};

/**
 * Returns a default initialized CalculationSettings object.
 *
 * @returns A CalculationSettings object.
 */
const constructDefaultSettings = (): CalculationSettings => {
  const newPlateConfig = new DefaultPlateConfig();

  return {
    plateConfig: newPlateConfig,
  };
};

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
    constructDefaultSettings()
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

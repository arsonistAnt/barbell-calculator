import React, { createContext, useReducer, useEffect } from "react";
import AsynStorage from "@react-native-community/async-storage";
import StorageKeys, { setToJsonReplacer } from "../utils/StorageKeys";
import {
  Plate,
  DefaultPlateConfig,
  PlateConfig,
  WeightConversions,
} from "../utils/PlateCalculation";

/**
 * Type restriction that contains all calculation settings for the barbell calculator.
 */
export interface CalculationSettings {
  // Boolean to check if custom plate numbers should be used.
  customMode: boolean;
  plateConfig: DefaultPlateConfig;
  checkedPlateTypes: Set<number>;
}

/**
 * Types of actions relative to user settings.
 */
type SettingAction =
  | { type: "toggle_custom_plates"; isEnabled: boolean }
  | { type: "update_checked_plates"; newTypeSet: Set<number> }
  | { type: "update_plate_amount"; newPlate: Plate }
  | { type: "update_type_conversion"; conversionType: WeightConversions }
  | { type: "update_barbell_weight"; newWeight: number };

type SettingStorageAction =
  | { type: "save_user_settings" }
  | { type: "update_user_settings"; updatedSettings: CalculationSettings };

/**
 * Interface that describes the types of data that will be in the settings provider.
 */
interface SettingsContextProp {
  state: CalculationSettings;
  dispatch: React.Dispatch<SettingAction | SettingStorageAction>;
}

/**
 * This reducer is mainly used to update the settings for the barbell calculation.
 *
 * @param state the CalculationSettings object
 * @param action the action type and payload object used to update the current state of the settings.
 */
const settingsReducer = (
  state: CalculationSettings,
  action: SettingAction | SettingStorageAction
) => {
  switch (action.type) {
    case "toggle_custom_plates":
      return { ...state, customMode: action.isEnabled };
    case "update_checked_plates":
      return { ...state, checkedPlateTypes: action.newTypeSet };
    case "update_plate_amount":
      const newConfig = updateConfigPlateAmount(
        state.plateConfig,
        action.newPlate
      );
      return { ...state, plateConfig: newConfig };
    case "update_type_conversion": {
      const currPlateConfig = state.plateConfig;
      currPlateConfig.conversionType = action.conversionType;
      return { ...state, plateConfig: currPlateConfig };
    }
    case "update_barbell_weight": {
      const currPlateConfig = state.plateConfig;
      currPlateConfig.barbellWeight = action.newWeight;
      return { ...state, plateConfig: currPlateConfig };
    }
    case "save_user_settings":
      saveSettings(state);
      return state;
    case "update_user_settings":
      return action.updatedSettings;
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
    const parsedSettings: CalculationSettings = JSON.parse(
      storedSettings
    ) as CalculationSettings;
    // Revert the checkedPlateTypes property back to a set.
    parsedSettings.checkedPlateTypes = new Set<number>(
      parsedSettings.checkedPlateTypes
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
  // Filter and reduce the default plate numbers into a set of numbers.
  const defaultCheckedPlates: Set<number> = newPlateConfig.availablePlates.reduce(
    (defaultSet, currPlate: Plate) => {
      if ([2.5, 5, 10, 25, 35, 45].includes(currPlate.type)) {
        defaultSet.add(currPlate.type);
      }
      return defaultSet;
    },
    new Set<number>()
  );
  return {
    customMode: false,
    plateConfig: newPlateConfig,
    checkedPlateTypes: defaultCheckedPlates,
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

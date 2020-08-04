import React, { createContext, useReducer } from "react";
import {
  Plate,
  DefaultPlateConfig,
  PlateConfig,
  WeightConversions,
} from "../utils/PlateCalculation";

//TODO Store all of this in async.
/**
 * Type restriction that contains all calculation settings for the barbell calculator.
 */
type CalculationSettings = {
  // Boolean to check if custom plate numbers should be used.
  customMode: boolean;
  plateConfig: DefaultPlateConfig;
  checkedPlates: Set<Plate>;
};

/**
 * Types of actions relative to user settings.
 */
type SettingAction =
  | { type: "toggle_custom_plates"; isEnabled: boolean }
  | { type: "update_checked_plates"; newSet: Set<Plate> }
  | { type: "update_plate_amount"; newPlate: Plate }
  | { type: "update_type_conversion"; conversionType: WeightConversions }
  | { type: "update_barbell_weight"; newWeight: number };

/**
 * Interface that describes the types of data that will be in the settings provider.
 */
interface SettingsContextProp {
  state: CalculationSettings;
  dispatch: React.Dispatch<SettingAction>;
}

//TODO Get default se ttings from async storage.
const defaultSettings = {} as SettingsContextProp;
const Context = createContext(defaultSettings);
const { Provider } = Context;

/**
 * This reducer is mainly used to update the settings for the barbell calculation.
 *
 * @param state the CalculationSettings object
 * @param action the action type and payload object used to update the current state of the settings.
 */
const settingsReducer = (state: CalculationSettings, action: SettingAction) => {
  switch (action.type) {
    case "toggle_custom_plates":
      return { ...state, customMode: action.isEnabled };
    case "update_checked_plates":
      return { ...state, checkedPlates: action.newSet };
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
function updateConfigPlateAmount(
  currPlateConfig: PlateConfig,
  newPlateState: Plate
): PlateConfig {
  const updateIndex = currPlateConfig.availablePlates.findIndex(
    (plate) => plate.type == newPlateState.type
  );
  currPlateConfig.availablePlates[updateIndex].amount = newPlateState.amount;
  return currPlateConfig;
}

/**
 * Provides any requesting children the settings data.
 */
const SettingsProvider: React.FunctionComponent = ({ children }) => {
  const newPlateConfig = new DefaultPlateConfig();
  const defaultCheckedPlates = newPlateConfig.availablePlates.filter((plate) =>
    [45, 35, 25, 10, 5, 2.5].includes(plate.type)
  );
  const [state, dispatch] = useReducer(settingsReducer, {
    customMode: false,
    plateConfig: newPlateConfig,
    checkedPlates: new Set([...defaultCheckedPlates]),
  });
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Context, SettingsProvider };

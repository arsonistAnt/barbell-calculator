import React, { createContext, useReducer } from "react";

//TODO Store all of this in async.
/**
 * Class that contains all calculation settings for the barbell calculator.
 */
type CalculationSettings = {
  // Boolean to check if custom plate numbers should be used.
  customMode: boolean;
};

type SettingAction = { type: "toggle_custom_plates"; isEnabled: boolean };

interface SettingsContextProp {
  state: CalculationSettings;
  dispatch: React.Dispatch<SettingAction>;
}

//TODO Get default settings from async storage.
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
  if (action.type == "toggle_custom_plates") {
    return { ...state, customMode: action.isEnabled };
  }
  return state;
};

/**
 * Provides any requesting children the settings data.
 */
const SettingsProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, { customMode: true });
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Context, SettingsProvider };

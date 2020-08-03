import React, { createContext, useReducer } from "react";

//TODO Get default settings from async storage.
const defaultSettings = {};
const Context = createContext(defaultSettings);
const { Provider } = Context;

//TODO Store all of this in async.
/**
 * Class that contains all calculation settings for the barbell calculator.
 */
class CalculationSettings {
  // Boolean to check if custom plate numbers should be used.
  customMode: boolean;
  constructor(customMode: boolean) {
    this.customMode = customMode;
  }
}

/**
 * This reducer is mainly used to update the settings for the barbell calculation.
 *
 * @param state the CalculationSettings object
 * @param action the action type and payload object used to update the current state of the settings.
 */
//TODO create type inference for the action parameter.
const settingsReducer = (state: CalculationSettings, action: any) => {
  if (action.type == "toggle_custom_plates") {
    return { ...state, customMode: action.payload };
  }
  return state;
};

/**
 * Provides any requesting children the settings data.
 */
const SettingsProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(
    settingsReducer,
    new CalculationSettings(false)
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Context, SettingsProvider };

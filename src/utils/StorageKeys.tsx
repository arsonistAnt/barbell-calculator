/**
 * Stores key names for the async storage.
 */
enum StorageKeys {
  UserSettings = "@user_settings",
}

/**
 * Replaces any Set<any> types and returns it as an array.
 *
 * @param key name of key in the json stringify results
 * @param value the value of the object in the key value pair (key : value)
 */
export const setToJsonReplacer = (key: any, value: any) => {
  if (typeof value === "object" && value instanceof Set) {
    return [...value];
  }
  return value;
};

export default StorageKeys;

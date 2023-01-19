import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveData(key: string, value: any): Promise<void> {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.error(error);
  }
}

export async function getData(key: string): Promise<any> {
  try {
    const json = await AsyncStorage.getItem(key);
    if (json !== null) return JSON.parse(json);
  } catch (error) {
    console.error(error);
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}

export async function containsKey(key: string): Promise<boolean> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    console.error(error);
  }

  return false;
}

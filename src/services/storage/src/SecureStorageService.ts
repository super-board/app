import EncryptedStorage from "react-native-encrypted-storage";

export async function saveData(key: string, value: any): Promise<void> {
  try {
    const json = JSON.stringify(value);
    await EncryptedStorage.setItem(key, json);
  } catch (error) {
    console.error(error);
  }
}

export async function getData(key: string): Promise<any> {
  try {
    const json = await EncryptedStorage.getItem(key);
    if (json !== null) return JSON.parse(json);
  } catch (error) {
    console.error(error);
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}

export async function containsKey(key: string): Promise<boolean> {
  try {
    const data = await EncryptedStorage.getItem(key);
    return data !== null;
  } catch (error) {
    console.error(error);
  }

  return false;
}

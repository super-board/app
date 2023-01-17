import {Platform} from "react-native";
import {PERMISSIONS, PermissionStatus, RESULTS, request} from "react-native-permissions";

export async function requestPermission(): Promise<PermissionStatus> {
  if (Platform.OS === "android") {
    return RESULTS.UNAVAILABLE;
  }

  return request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
}

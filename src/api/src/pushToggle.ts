import {axiosAuthenticated} from "./config";

type PushSetting = {
  commentYn: string;
  favoriteTagYn: string;
};

export async function uploadFCMToken(token: string) {
  return axiosAuthenticated.post("/pushToggle/createPushToken", {pushTokenValue: token});
}

export async function fetchPushSettings() {
  return axiosAuthenticated.get<unknown, PushSetting>("/pushToggle");
}

export async function updatePushSettings(setting: PushSetting) {
  return axiosAuthenticated.patch("/pushToggle", setting);
}

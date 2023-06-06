import {Notification} from "@/types";

import {notificationList} from "./dummies/notificationList";

export async function fetchNotifications(): Promise<Notification[]> {
  return new Promise(resolve => resolve(notificationList));
  // return axiosAuthenticated.get<unknown, {}>('')
}

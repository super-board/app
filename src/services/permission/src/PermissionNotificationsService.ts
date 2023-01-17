import {Platform} from 'react-native';
import {
  NotificationSettings,
  PermissionStatus,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';

export async function requestPermission(): Promise<{
  status: PermissionStatus;
  settings: NotificationSettings;
}> {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    return {status: RESULTS.GRANTED, settings: {}};
  }

  return await requestNotifications(['alert', 'badge', 'sound']);
}

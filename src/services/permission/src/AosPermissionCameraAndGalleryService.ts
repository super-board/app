import {
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions';

export async function requestPermission(): Promise<
  Record<string, PermissionStatus>
> {
  const statuses = await requestMultiple([
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ]);
  return statuses;
}

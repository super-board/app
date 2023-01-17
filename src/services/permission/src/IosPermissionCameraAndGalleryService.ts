import {
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions';

export async function requestPermission(): Promise<
  Record<string, PermissionStatus>
> {
  const statuses = await requestMultiple([
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  ]);
  return statuses;
}

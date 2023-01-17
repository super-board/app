import {Platform} from 'react-native';
import {PermissionStatus} from 'react-native-permissions';

import * as AosPermissionCameraAndGalleryService from './AosPermissionCameraAndGalleryService';
import * as IosPermissionCameraAndGalleryService from './IosPermissionCameraAndGalleryService';

type TargetOS = 'android' | 'ios';

const PermissionCameraAndGalleryServiceImpl = {
  android: AosPermissionCameraAndGalleryService,
  ios: IosPermissionCameraAndGalleryService,
}[Platform.OS as TargetOS];

export async function requestPermission(): Promise<
  Record<string, PermissionStatus>
> {
  return PermissionCameraAndGalleryServiceImpl.requestPermission();
}

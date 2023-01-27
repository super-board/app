import React from "react";

import {StyleSheet, View} from "react-native";

import {Button} from "@/components";
import colors from "@/constants/colors";
import {
  PermissionAppTrackingTransparencyService,
  PermissionCameraAndGalleryService,
  PermissionNotificationsService,
} from "@/services/permission";

export default function PermissionTestScreen() {
  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonGap}
        text="카메라 권한 요청하기"
        onPress={PermissionCameraAndGalleryService.requestPermission}
      />
      <Button
        style={styles.buttonGap}
        text="알림 권한 요청하기"
        onPress={PermissionNotificationsService.requestPermission}
      />
      <Button
        text="앱 추적 허용 요청하기"
        onPress={PermissionAppTrackingTransparencyService.requestPermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGap: {
    marginBottom: 8,
  },
});

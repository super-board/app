import React from "react";

import {StyleSheet, View} from "react-native";

import {OTBButton} from "@/components";
import colors from "@/constants/colors";
import {
  PermissionAppTrackingTransparencyService,
  PermissionCameraAndGalleryService,
  PermissionNotificationsService,
} from "@/services/permission";

function PermissionTestScreen() {
  return (
    <View style={styles.container}>
      <OTBButton
        type="basic-primary"
        style={styles.buttonGap}
        text="카메라 권한 요청하기"
        onPress={PermissionCameraAndGalleryService.requestPermission}
      />
      <OTBButton
        type="basic-primary"
        style={styles.buttonGap}
        text="알림 권한 요청하기"
        onPress={PermissionNotificationsService.requestPermission}
      />
      <OTBButton
        type="basic-primary"
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

export default PermissionTestScreen;

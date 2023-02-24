import React from "react";

import {StyleSheet, Text, View} from "react-native";

import {FlexEmptyFill, OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useSavePermissionGrantResult} from "@/hooks/permssion";
import {
  PermissionAppTrackingTransparencyService,
  PermissionCameraAndGalleryService,
  PermissionNotificationsService,
} from "@/services/permission";

export default function RequestScreen({navigation}: ScreenProps) {
  const {savePermissionGrantResult} = useSavePermissionGrantResult();

  const onRequestPermissions = async () => {
    await PermissionNotificationsService.requestPermission();
    await PermissionCameraAndGalleryService.requestPermission();
    await PermissionAppTrackingTransparencyService.requestPermission();
    savePermissionGrantResult();
    navigation.reset({index: 0, routes: [{name: "BottomTabView"}]});
  };

  return (
    <View style={style.screenWithAppBarContainer}>
      <Text style={[typography.display04, typography.textWhite, effects.textDropShadow]}>
        세상에서 제일 재미있는
        {"\n"}
        보드게임 정보를 알고 싶으신가요?
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.body01, typography.textBlack500, effects.textDropShadow]}>
        그렇다면 서비스 활동 정보 제공에 꼭! 동의해 주세요.
      </Text>

      <SizedBox height={8} />
      <View style={styles.contentContainer}>
        <View style={styles.alertContainer}>
          <Text style={[typography.bodyLong02, styles.alertContent]}>
            On the Board 앱이 다른 회사의 앱 및 웹사이트에 걸친 사용자의 활동을 추적하도록
            허용하겠습니까?
          </Text>
          <View style={styles.alertDivider} />
          <Text style={[typography.subhead02, styles.alertButtonText]}>허용</Text>
        </View>
      </View>

      <FlexEmptyFill />

      <OTBButton type="basic-primary" text="확인" onPress={onRequestPermissions} />
      <SizedBox height={36} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    height: 214,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
  },
  alertContainer: {
    width: "100%",
    minWidth: 240,
    backgroundColor: "#E9E9E9",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContent: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    color: colors.OTBBlack,
    textAlign: "center",
  },
  alertDivider: {
    width: "100%",
    minWidth: 240,
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
  },
  alertButtonText: {padding: 12, color: colors.OTBBlack},
});

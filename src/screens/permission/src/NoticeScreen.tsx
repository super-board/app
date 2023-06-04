import React, {useCallback} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {FlexEmptyFill, OTBButton, ScreenTitle, SizedBox} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {usePermissionGrantStore} from "@/zustand-stores";

export default function NoticeScreen({navigation}: ScreenProps) {
  const {shouldRequestPermissionGrant} = usePermissionGrantStore();

  useFocusEffect(
    useCallback(() => {
      if (!shouldRequestPermissionGrant)
        navigation.reset({index: 0, routes: [{name: "BottomTabView"}]});
    }, []),
  );

  return (
    <View style={style.screenWithAppBarContainer}>
      <ScreenTitle
        title="앱 서비스 접근 권한 안내"
        description="권한을 허용하지 않아도 온더보드 이용은 가능하지만 일부 서비스가 제한될 수 있어요."
      />

      <SizedBox height={60} />
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <SVG.Icon.Notifications width={24} height={24} />
          <SizedBox width={10} />
          <View style={styles.column}>
            <Text style={[typography.subhead01, typography.textWhite]}>
              <Text style={typography.textBlueLight2}>알림 </Text>
              (선택)
            </Text>
            <SizedBox height={4} />
            <Text style={[typography.body01, typography.textWhite]}>
              푸시 알림 및 메세지 수신 안내
            </Text>
          </View>
        </View>

        <SizedBox height={24} />

        <View style={styles.row}>
          <SVG.Icon.AddAPhoto width={24} height={24} />
          <SizedBox width={10} />
          <View style={styles.column}>
            <Text style={[typography.subhead01, typography.textWhite]}>
              <Text style={typography.textBlueLight2}>사진/카메라 </Text>
              (선택)
            </Text>
            <SizedBox height={4} />
            <Text style={[typography.body01, typography.textWhite]}>리뷰 작성 시 사진 업로드</Text>
          </View>
        </View>
      </View>

      <FlexEmptyFill />

      <OTBButton
        type="basic-primary"
        text="확인"
        onPress={() => navigation.navigate("PermissionGrantRequestScreen")}
      />
      <SizedBox height={36} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    height: 214,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
  },
  row: {width: 212, flexDirection: "row"},
  column: {flexDirection: "column"},
});

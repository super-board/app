import React, {useEffect} from "react";

import {useNetInfo} from "@react-native-community/netinfo";
import {StyleSheet, View} from "react-native";
import RNExitApp from "react-native-exit-app";
import FastImage from "react-native-fast-image";

import {SVG} from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import {useInitializeApp, useModal} from "@/hooks";
import {useAppSettingStore} from "@/zustand-stores";

function SplashScreen() {
  const netInfo = useNetInfo();
  const {initializeApp} = useInitializeApp();
  const {initializeApp: completeInitializing} = useAppSettingStore();
  const {visible, openModal} = useModal();

  const initializeAppAsync = React.useCallback(async () => {
    if (!netInfo.isConnected) return openModal();

    await initializeApp();
    completeInitializing();
  }, [netInfo]);

  const closeApp = () => RNExitApp.exitApp();

  useEffect(() => {
    const timeout = setTimeout(initializeAppAsync, 1500);
    return () => clearTimeout(timeout);
  }, [netInfo]);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.icon}
        source={require("@/assets/images/icon/splash-icon.png")}
        resizeMode={FastImage.resizeMode.center}
      />
      <SVG.Logo.Text style={styles.title} width={127} height={15} fill={colors.white} />
      <Modal.Dialog
        visible={visible}
        title="인터넷 연결이 불안정합니다"
        description="연결을 확인 후 재시도 해주세요."
        confirmText="재시도"
        onConfirm={initializeAppAsync}
        cancelText="닫기"
        onCancel={closeApp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlack,
  },
  icon: {
    width: 119,
    height: 97,
  },
  title: {
    position: "absolute",
    bottom: 40,
    margin: "auto",
  },
});

export default SplashScreen;

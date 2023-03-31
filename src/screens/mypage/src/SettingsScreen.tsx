import React, {useEffect} from "react";

import {Pressable, ScrollView, StyleSheet, Text} from "react-native";

import * as SVG from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal} from "@/hooks/modal";
import {useSignOutMutation} from "@/store";

export default function SettingsScreen({navigation}: ScreenProps) {
  const {visible: isLogoutVisible, openModal: openLogout, closeModal: closeLogout} = useModal();

  const [logout, {isSuccess: shouldLogout}] = useSignOutMutation();

  /* 로그아웃 요청이 성공하면 화면 이동 */
  useEffect(() => {
    if (shouldLogout) navigation.reset({index: 0, routes: [{name: "LoginScreen"}]});
  }, [shouldLogout]);

  const onConfirmWithdraw = () => {};

  return (
    <ScrollView style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <Pressable style={styles.button} onPress={openLogout}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>로그아웃</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>비밀번호 변경</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>알림</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>서비스 탈퇴</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>정책 및 약관</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>

      <Modal.Dialog
        visible={isLogoutVisible}
        onRequestClose={closeLogout}
        title="로그아웃"
        description="로그아웃하시겠습니까?"
        confirmText="로그아웃"
        onConfirm={logout}
      />
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.OTBBlack700,
    borderBottomWidth: 1,
  },
  buttonIcon: {transform: [{rotate: "180deg"}], color: colors.OTBBlack300},
});

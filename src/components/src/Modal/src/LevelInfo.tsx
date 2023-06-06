import React from "react";

import {Modal as DefModal, Pressable, StyleSheet, Text, View} from "react-native";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {Level} from "@/types";

import {LevelIconWithBackground} from "../../Level";
import SizedBox from "../../SizedBox";
import type {ModalProps} from "./types";

export default function LevelInfo({visible, onRequestClose, ...otherProps}: ModalProps) {
  const levelInfos = [
    {icon: "JOKER", level: 6, name: "조커", condition: "누적포인트 : 5000P 이상"},
    {icon: "SPADE", level: 5, name: "스페이드", condition: "누적포인트 : 1000P 이상"},
    {icon: "DIAMOND", level: 4, name: "다이아몬드", condition: "누적포인트 : 500P 이상"},
    {icon: "HEART", level: 3, name: "하트", condition: "누적포인트 : 200P 이상"},
    {icon: "CLOVER", level: 2, name: "클로버", condition: "누적포인트 : 100P 이상"},
    {icon: "PLAYER", level: 1, name: "플레이어", condition: "누적포인트 : 0P 이상"},
  ] as {icon: Level; level: number; name: string; condition: string}[];

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}
      {...otherProps}>
      <View style={styles.screenContainer}>
        <Pressable onPress={onRequestClose} style={styles.backdrop} />
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={[typography.display05, typography.textWhite]}>회원등급</Text>
            <Pressable style={styles.closeButton} onPress={onRequestClose}>
              <SVG.Icon.Close width={30} height={30} />
            </Pressable>
          </View>

          <View style={styles.contentContainer}>
            {levelInfos.map(levelInfo => (
              <View key={levelInfo.level} style={styles.contentRow}>
                <LevelIconWithBackground level={levelInfo.icon} width={40} height={40} />
                <View>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={styles.levelChip}>Lv.{levelInfo.level}</Text>
                    <SizedBox width={4} />
                    <Text style={[typography.subhead02, typography.textWhite]}>
                      {levelInfo.name}
                    </Text>
                  </View>
                  <Text style={[typography.caption, {color: colors.OTBBlack300}]}>
                    {levelInfo.condition}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </DefModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalContainer: {
    backgroundColor: colors.OTBBlack800,
    alignItems: "center",
    width: "70%",
    borderRadius: 8,
    overflow: "hidden",
  },
  headerContainer: {
    width: "100%",
    position: "relative",
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.OTBBlueLight2,
  },
  closeButton: {position: "absolute", top: 16, right: 16},
  contentContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    gap: 16,
  },
  contentRow: {
    width: 200,
    flexDirection: "row",
    gap: 16,
  },
  levelChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.OTBBlack,
    color: colors.white,
    fontFamily: "PretendardVariable-Regular",
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: -0.6,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
});

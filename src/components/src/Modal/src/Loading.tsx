import React from "react";

import {Modal as DefModal, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";

import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";

import SizedBox from "../..//SizedBox";
import type {ModalProps} from "./types";

export default function Loading({visible, title = "", ...otherProps}: ModalProps) {
  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={() => {}}
      {...otherProps}>
      <View style={styles.screenContainer}>
        <View style={styles.backdrop} />
        <View style={[styles.modalContainer, styles.loadingContainer]}>
          <FastImage
            source={require("@/assets/images/icon/puzzle-icon.png")}
            style={styles.loadingImage}
          />
          <SizedBox height={16} />
          <Text
            style={[
              typography.subhead01,
              typography.textWhite,
              typography.textCenter,
              effects.textDropShadow,
            ]}>
            {title}
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  loadingContainer: {
    maxWidth: 240,
    paddingHorizontal: 34,
    paddingVertical: 34,
  },
  loadingImage: {width: 112, height: 112},
  badgeContainer: {
    borderRadius: 8,
    height: "50%",
  },
});

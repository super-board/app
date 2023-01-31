import React from "react";

import {Modal as DefModal, Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";

import SizedBox from "../..//SizedBox";
import OTBButton from "../../OTBButton";
import type {ModalProps} from "./types";

export default function Warn({
  visible,
  title = "",
  description = "",
  dismissible = false,
  onRequestClose,
  ...otherProps
}: ModalProps) {
  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}
      {...otherProps}>
      <View style={styles.screenContainer}>
        <TouchableOpacity
          onPress={dismissible ? onRequestClose : () => {}}
          activeOpacity={1}
          style={styles.backdrop}
        />
        <View style={styles.modalContainer}>
          <SizedBox height={8} />
          <SVG.Common.Warning width={48} height={48} />
          <SizedBox height={24} />
          <Text style={[typography.subhead01, typography.textWhite, effects.textDropShadow]}>
            {title}
          </Text>
          <SizedBox height={8} />
          <Text style={[typography.body02, typography.textWhite, effects.textDropShadow]}>
            {description}
          </Text>
          <OTBButton type="modal-primary" text="확인" onPress={onRequestClose} />
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
});
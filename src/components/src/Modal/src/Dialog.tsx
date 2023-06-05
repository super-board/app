import React, {useState} from "react";

import {
  Modal as DefModal,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";

import OTBButton from "../../OTBButton";
import SizedBox from "../../SizedBox";
import type {DialogProps} from "./types";

export default function Dialog({
  visible,
  IconComponent = <SVG.Common.Warning width={48} height={48} />,
  title = "",
  description = "",
  confirmText = "확인",
  cancelText = "취소",
  onConfirm = async () => {},
  onRequestClose,
  ...otherProps
}: DialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const _onConfirm = async (event: NativeSyntheticEvent<any>) => {
    setIsLoading(true);
    await onConfirm.call(null);
    setIsLoading(false);
    onRequestClose?.call(null, event);
  };

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}
      {...otherProps}>
      <View style={styles.screenContainer}>
        <TouchableOpacity onPress={onRequestClose} activeOpacity={1} style={styles.backdrop} />
        <View style={styles.modalContainer}>
          <SizedBox height={8} />
          {IconComponent}
          <SizedBox height={24} />
          <Text
            style={[
              typography.subhead01,
              typography.textWhite,
              typography.textCenter,
              effects.textDropShadow,
            ]}>
            {title}
          </Text>
          {description ? (
            <>
              <SizedBox height={8} />
              <Text
                style={[
                  typography.body02,
                  typography.textWhite,
                  typography.textCenter,
                  effects.textDropShadow,
                ]}>
                {description}
              </Text>
            </>
          ) : null}
          <SizedBox height={24} />
          <View style={styles.buttonContainer}>
            <OTBButton
              style={{flex: 1}}
              type="modal-secondary"
              text={cancelText}
              onPress={onRequestClose}
              disabled={isLoading}
            />
            <OTBButton
              style={{flex: 1}}
              type="modal-primary"
              text={confirmText}
              onPress={_onConfirm}
              disabled={isLoading}
            />
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

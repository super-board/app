import React, {useEffect, useState} from "react";

import {Modal as DefModal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import * as SVG from "@/assets/svgs";
import badge from "@/constants/badges";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";

import OTBButton from "../../OTBButton";
import SizedBox from "../../SizedBox";
import type {BadgeModalProps, BadgeProps} from "./types";

export default function Badge({
  visible,
  type,
  title = "",
  description = "",
  onRequestClose,
  ...otherProps
}: BadgeModalProps) {
  const [item, setItem] = useState<BadgeProps>({});

  useEffect(() => {
    switch (type) {
      case "welcome":
        setItem(badge.welcome);
        break;
      case "review1":
        setItem(badge.review1);
        break;
      case "review5":
        setItem(badge.review5);
        break;
      case "attendance7":
        setItem(badge.attendance7);
        break;
      case "attendance30":
        setItem(badge.attendance30);
        break;
    }
  }, [type]);

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      {...otherProps}>
      <View style={styles.screenContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.backdrop} />
        <View style={[styles.modalContainer, styles.badgeContainer]}>
          <View style={styles.close}>
            <TouchableOpacity onPress={onRequestClose}>
              <SVG.Icon.Close width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.badge}>
            <SVG.Badge.Welcome width={"103%"} height={"100%"} style={styles.badgeSVG} />
          </View>
          <Text style={[typography.subhead01, typography.textWhite, effects.textDropShadow]}>
            {item.title}
          </Text>
          <SizedBox height={8} />
          <Text style={[typography.body02, typography.textWhite, effects.textDropShadow]}>
            {item.subTitle}
          </Text>
          <SizedBox height={20} />
        </View>

        <OTBButton
          type="modal-primary"
          text="내 뱃지 보러가기"
          onPress={onRequestClose}
          style={{marginTop: 8, width: "70%"}}
        />
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
  badgeContainer: {
    borderRadius: 8,
    height: "50%",
  },
  close: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 8,
    marginTop: 8,
  },
  badge: {
    flex: 1,
    width: "100%",
  },
  badgeSVG: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
});
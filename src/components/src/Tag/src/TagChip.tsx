import React from "react";

import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

type Props = {
  type: TagChipType;
  text?: string;
  style?: StyleProp<ViewStyle>;
};

export type TagChipType = "active" | "inactive" | "myPage";

export default function TagChip({type, text = "", style, ...otherProps}: Props) {
  switch (type) {
    case "active":
      return (
        <View style={[styles.tag, styles.tagActive, style]} {...otherProps}>
          <Text style={[typography.body01, styles.textActive]}>{text}</Text>
        </View>
      );
    case "inactive":
      return (
        <View style={[styles.tag, styles.tagInactive, style]} {...otherProps}>
          <Text style={[typography.body01, styles.textInactive]}>{text}</Text>
        </View>
      );
    case "myPage":
      return (
        <View style={[styles.tag, styles.tagInactive, style]} {...otherProps}>
          <Text style={[typography.body01, styles.textInactive]}>{text}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagInactive: {
    backgroundColor: colors.OTBBlack700,
  },
  tagActive: {
    backgroundColor: colors.OTBBlack200,
  },
  tagMyPage: {backgroundColor: colors.OTBBlack800},
  textInactive: {
    color: colors.OTBBlack50,
  },
  textActive: {
    color: colors.OTBBlack,
  },
  textMyPage: {color: colors.OTBBlack300},
});

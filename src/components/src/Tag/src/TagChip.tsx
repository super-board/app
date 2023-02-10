import React from "react";

import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

type Props = {
  text?: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function TagChip({text = "", active = false, style, ...otherProps}: Props) {
  return (
    <View
      style={[styles.tag, active ? styles.tagActive : styles.tagInactive, style]}
      {...otherProps}>
      <Text style={[typography.body01, active ? styles.textActive : styles.textInactive]}>
        {text}
      </Text>
    </View>
  );
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
  textInactive: {
    color: colors.OTBBlack50,
  },
  textActive: {
    color: colors.OTBBlack,
  },
});

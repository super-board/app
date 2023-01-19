import React from "react";

import {StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

type Props = {
  text?: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

function OTBButtonTag({
  text = "",
  active = false,
  style,
  onPress = () => {},
  ...otherProps
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.tag, active ? styles.tagActive : styles.tagInactive, style]}
      onPress={onPress}
      {...otherProps}>
      <Text style={[typography.body01, active ? styles.textActive : styles.textInactive]}>
        {text}
      </Text>
    </TouchableOpacity>
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

export default OTBButtonTag;

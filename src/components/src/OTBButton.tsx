import React from "react";

import {StyleProp, StyleSheet, Text, TouchableHighlight, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

type OTBButtonType = "basic-primary" | "basic-secondary" | "medium-primary" | "medium-secondary";

type Props = {
  type: OTBButtonType;
  text?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

function OTBButton({
  type,
  text = "",
  disabled = false,
  style,
  onPress = () => {},
  ...otherProps
}: Props) {
  if (type === "basic-primary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonBasic,
          disabled ? styles.buttonDisabled : styles.buttonBasicPrimary,
          style,
        ]}
        underlayColor={colors.OTBBlueDark}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead01, disabled ? styles.textDisabled : styles.textPrimary]}>
          {text}
        </Text>
      </TouchableHighlight>
    );

  if (type === "basic-secondary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonBasic,
          disabled ? styles.buttonDisabled : styles.buttonBasicSecondary,
          style,
        ]}
        underlayColor={colors.OTBBlack200}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead01, disabled ? styles.textDisabled : styles.textSecondary]}>
          {text}
        </Text>
      </TouchableHighlight>
    );

  if (type === "medium-primary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonMedium,
          disabled ? styles.buttonDisabled : styles.buttonMediumPrimary,
          style,
        ]}
        underlayColor={colors.OTBBlueDark}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead02, disabled ? styles.textDisabled : styles.textPrimary]}>
          {text}
        </Text>
      </TouchableHighlight>
    );

  if (type === "medium-secondary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonMedium,
          disabled ? styles.buttonDisabled : styles.buttonMediumSecondary,
          style,
        ]}
        underlayColor={colors.OTBBlack400}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead02, disabled ? styles.textDisabled : styles.textSecondary]}>
          {text}
        </Text>
      </TouchableHighlight>
    );

  return (
    <TouchableHighlight
      style={[styles.button, styles.buttonBasic]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={typography.subhead01}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonBasic: {
    height: 60,
    borderRadius: 10,
  },
  buttonBasicPrimary: {
    backgroundColor: colors.OTBBlue,
  },
  buttonBasicSecondary: {
    backgroundColor: colors.OTBBlack100,
  },
  buttonMedium: {
    height: 48,
    borderRadius: 4,
  },
  buttonMediumPrimary: {
    backgroundColor: colors.OTBBlue,
  },
  buttonMediumSecondary: {
    backgroundColor: colors.OTBBlack300,
  },
  buttonDisabled: {
    backgroundColor: colors.OTBBlack800,
    color: colors.OTBBlack600,
  },
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.OTBBlack,
  },
  textDisabled: {
    color: colors.OTBBlack600,
  },
});

export default OTBButton;

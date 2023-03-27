import React from "react";

import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  ViewStyle,
} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

type OTBButtonType =
  | "basic-primary"
  | "basic-secondary"
  | "medium-primary"
  | "medium-secondary"
  | "modal-primary"
  | "modal-secondary"
  | "short-primary"
  | "short-secondary"
  | "short-tertiary";

type Props = {
  type: OTBButtonType;
  text?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (() => void) | ((event: NativeSyntheticEvent<any>) => void);
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

  if (type === "modal-primary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonModal,
          disabled ? styles.buttonDisabled : styles.buttonModalPrimary,
          style,
        ]}
        underlayColor={colors.OTBBlueDark}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead02, disabled ? styles.textDisabled : styles.textModal]}>
          {text}
        </Text>
      </TouchableHighlight>
    );
  
  if (type === "modal-secondary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonModal,
          disabled ? styles.buttonDisabled : styles.buttonModalSecondary,
          style,
        ]}
        underlayColor={colors.OTBBlueDark}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead02, disabled ? styles.textDisabled : styles.textSecondary]}>
          {text}
        </Text>
      </TouchableHighlight>
    );


  if (type === "short-primary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonShort,
          disabled ? styles.buttonDisabled : styles.buttonShortPrimary,
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

  if (type === "short-secondary")
    return (
      <TouchableHighlight
        style={[
          styles.button,
          styles.buttonShort,
          disabled ? styles.buttonDisabled : styles.buttonShortSecondary,
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

  if (type === "short-tertiary")
    return (
      <TouchableHighlight
        style={[styles.button, styles.buttonShort, styles.buttonShortTertiary, style]}
        underlayColor={colors.OTBBlack800}
        disabled={disabled}
        onPress={onPress}
        {...otherProps}>
        <Text style={[typography.subhead02, disabled ? styles.textDisabled : styles.textTertiary]}>
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
  buttonModal: {
    height: 40,
    borderRadius: 4,
  },
  buttonModalPrimary: {backgroundColor: colors.OTBBlue},
  buttonModalSecondary: {backgroundColor: colors.white},
  buttonShort: {
    height: 48,
    borderRadius: 4,
  },
  buttonShortPrimary: {backgroundColor: colors.OTBBlue},
  buttonShortSecondary: {backgroundColor: colors.OTBBlack200},
  buttonShortTertiary: {backgroundColor: colors.OTBBlack800},
  buttonDisabled: {
    backgroundColor: colors.OTBBlack800,
  },
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.OTBBlack,
  },
  textTertiary: {
    color: colors.OTBBlack50,
  },
  textModal: {
    color: colors.OTBBlack100,
  },
  textDisabled: {
    color: colors.OTBBlack600,
  },
});

export default OTBButton;

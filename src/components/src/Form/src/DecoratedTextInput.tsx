import React, {ReactNode} from "react";

import {StyleProp, StyleSheet, Text, TextInput, View, ViewStyle} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

type Props = TextInput["props"] & {
  label: string;
  instructionText?: string;
  isValid?: boolean;
  invalidText?: string;
  hideInvalidText?: boolean;
  style?: StyleProp<ViewStyle>;
  rightDecorationComponent?: ReactNode;
};

export default function DecoratedTextInput({
  label,
  value,
  instructionText,
  isValid = true,
  invalidText,
  hideInvalidText = false,
  placeholder,
  keyboardType,
  autoCorrect = false,
  secureTextEntry,
  editable = true,
  style,
  rightDecorationComponent,
  onChangeText = (text: string) => {},
  ...otherProps
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[typography.caption, styles.label]}>{label}</Text>

      <View style={{position: "relative", width: "100%"}}>
        <TextInput
          style={[
            typography.body02,
            styles.input,
            {
              borderColor: isValid ? colors.OTBBlack300 : colors.noticeRed,
              color: editable ? colors.OTBBlack200 : colors.OTBBlack400,
              backgroundColor: editable ? "transparent" : colors.OTBBlack800,
            },
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.OTBBlack600}
          keyboardType={keyboardType}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          cursorColor={colors.OTBBlack200}
          editable={editable}
          onChangeText={onChangeText}
          {...otherProps}
        />
        <View style={styles.rightDecorationContainer}>{rightDecorationComponent}</View>
      </View>

      <View style={styles.bottomContainer}>
        {instructionText && !value && isValid ? (
          <Text style={[typography.caption, styles.instruction]}>{instructionText}</Text>
        ) : null}
        {!isValid && !hideInvalidText ? (
          <>
            <SVG.Icon.Invalid width={12} height={12} />
            <Text style={[typography.caption, styles.invalid]}>{invalidText}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    gap: 4,
  },
  label: {color: colors.OTBBlack400},
  input: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  bottomContainer: {height: 20, gap: 4, flexDirection: "row", alignItems: "center"},
  instruction: {color: colors.OTBBlack500},
  invalid: {color: colors.noticeRed},
  rightDecorationContainer: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

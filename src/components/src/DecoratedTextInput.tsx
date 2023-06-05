import React, {ReactNode} from "react";

import {StyleProp, StyleSheet, Text, TextInput, View, ViewStyle} from "react-native";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

type Props = TextInput["props"] & {
  label: string;
  instructionText?: string;
  isValid?: boolean;
  invalidText?: string;
  style?: StyleProp<ViewStyle>;
  rightDecorationComponent?: ReactNode;
};

export default function DecoratedTextInput({
  label,
  value,
  instructionText,
  isValid = true,
  invalidText,
  placeholder,
  keyboardType,
  autoCorrect = false,
  secureTextEntry,
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
            {borderColor: isValid ? colors.OTBBlack300 : colors.noticeRed},
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.OTBBlack600}
          keyboardType={keyboardType}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          cursorColor={colors.OTBBlack200}
          onChangeText={onChangeText}
          {...otherProps}
        />
        <View style={styles.rightDecorationContainer}>{rightDecorationComponent}</View>
      </View>

      <View style={styles.bottomContainer}>
        {instructionText && !value && isValid ? (
          <Text style={[typography.caption, styles.instruction]}>{instructionText}</Text>
        ) : null}
        {!isValid ? (
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
    paddingHorizontal: 16,
    borderRadius: 4,
    color: colors.OTBBlack200,
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

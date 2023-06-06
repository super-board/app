import React from "react";

import {Pressable, StyleSheet, Text, View} from "react-native";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";

export default function TermsAndConditionsListScreen({navigation}: ScreenProps) {
  const onPress = {
    privacy: () => navigation.navigate("MyPageTermsAndConditionsPrivacyScreen"),
    termsAndConditions: () => navigation.navigate("MyPageTermsAndConditionsScreen"),
  };

  return (
    <View style={[style.screenWithAppBarContainer, {padding: 0}]}>
      <Pressable style={styles.button} onPress={onPress.privacy}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>개인정보 처리방침</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>
      <Pressable style={styles.button} onPress={onPress.termsAndConditions}>
        <Text style={[typography.body01, {color: colors.OTBBlack50}]}>이용약관</Text>
        <SVG.Icon.ArrowBack style={styles.buttonIcon} width={20} height={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.OTBBlack700,
    borderBottomWidth: 1,
  },
  buttonIcon: {transform: [{rotate: "180deg"}], color: colors.OTBBlack300},
});

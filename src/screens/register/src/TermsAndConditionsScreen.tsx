import React from "react";

import {StyleSheet, View} from "react-native";

import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

import {ScreenTitle} from "../components";

export default function TermsAndConditionsScreen({navigation}: ScreenProps) {
  return (
    <View style={style.screenWithAppBarContainer}>
      <ScreenTitle title="이용약관 동의" />
    </View>
  );
}

const styles = StyleSheet.create({});

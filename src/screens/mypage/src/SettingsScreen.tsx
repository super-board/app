import React from "react";

import {StyleSheet, Text, View} from "react-native";

import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

export default function SettingsScreen({navigation}: ScreenProps) {
  return (
    <View style={style.screenWithAppBarContainer}>
      <Text>설정화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

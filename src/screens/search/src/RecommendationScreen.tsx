import React from "react";

import {StyleSheet, View} from "react-native";

import colors from "@/constants/colors";

export default function RecommendationScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
  },
});

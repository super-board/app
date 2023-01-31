import React from "react";

import {StyleSheet, View} from "react-native";

import {SelectedTagsHorizontalListView} from "@/components";
import colors from "@/constants/colors";

export default function RecommendationScreen() {
  return (
    <View style={styles.container}>
      <SelectedTagsHorizontalListView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
  },
});

import React, {memo} from "react";

import {StyleSheet, Text, View} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import type {ReviewDetails} from "@/store";

function ReviewListItem({review}: {review: ReviewDetails}) {
  return (
    <View style={styles.itemContainer}>
      <Text style={[typography.body02, typography.textWhite]}>{review.content.slice(0, 30)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: colors.OTBBlack800,
  },
});

export default memo(ReviewListItem);

import React from "react";

import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import type {ReviewDetails} from "@/store";

import ReviewListItem from "./ReviewListItem";

type Props = {
  reviews: ReviewDetails[];
  style?: StyleProp<ViewStyle>;
};

export default function ReviewList({reviews, style}: Props) {
  return (
    <View style={[styles.container, style]}>
      {reviews.map((review, index) => (
        <ReviewListItem key={review.id + index} review={review} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

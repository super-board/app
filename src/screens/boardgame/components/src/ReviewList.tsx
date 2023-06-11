import React from "react";

import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import type {Review} from "@/types";

import ReviewListItem from "./ReviewListItem";

type Props = {
  reviews: Review[];
  style?: StyleProp<ViewStyle>;
};

export default function ReviewList({reviews, style}: Props) {
  return (
    <View style={[styles.container, style]}>
      {reviews.map(review => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});

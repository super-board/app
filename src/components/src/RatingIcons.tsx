import React from "react";

import {StyleSheet, View} from "react-native";

import * as Svgs from "@/assets/svgs";
import type {Rating} from "@/services/api";

type Props = {
  rating: Rating;
};

export default function RatingIcons({rating}: Props) {
  const fullCount = Math.floor(rating);
  const hasHalf = rating % 1 === 0.5;
  const emptyCount = Math.floor(5 - rating);

  return (
    <View style={styles.container}>
      {new Array(fullCount).fill(0).map((_, index) => (
        <Svgs.Icon.RatingStarFull key={index} width={12} height={12} />
      ))}
      {hasHalf ? <Svgs.Icon.RatingStarHalf width={12} height={12} /> : null}
      {new Array(emptyCount).fill(0).map((_, index) => (
        <Svgs.Icon.RatingStarEmpty key={index + 5} width={12} height={12} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: "row", gap: 2},
});

import React from "react";

import {StyleSheet, View} from "react-native";

import {SVG} from "@/assets/svgs";

type Props = {
  rating?: number;
  size?: number;
};

export default function RatingIcons({rating = 0, size = 12}: Props) {
  const rounded = Math.round(rating * 2) / 2;
  const fullCount = Math.floor(rounded);
  const hasHalf = rounded % 1 === 0.5;
  const emptyCount = Math.floor(5 - rounded);

  if (!rating)
    return (
      <View style={styles.container}>
        {new Array(5).fill(0).map((_, index) => (
          <SVG.Icon.RatingStartNotRated key={index} width={size} height={size} />
        ))}
      </View>
    );

  return (
    <View style={styles.container}>
      {new Array(fullCount).fill(0).map((_, index) => (
        <SVG.Icon.RatingStarFull key={index} width={size} height={size} />
      ))}
      {hasHalf ? <SVG.Icon.RatingStarHalf width={size} height={size} /> : null}
      {new Array(emptyCount).fill(0).map((_, index) => (
        <SVG.Icon.RatingStarEmpty key={index + 5} width={size} height={size} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: "row", gap: 2},
});

import React from "react";

import {StyleSheet, View} from "react-native";

import * as SVG from "@/assets/svgs";

type RatingProps = {
  rating: Rating;
  size: number;
  editable: boolean;
  setRate: () => void;
};

export default function RatingIcons(props: RatingProps) {
  const {size = 12, rating, editable = true, setRate} = props;
  const rounded = Math.round(rating * 2) / 2;
  const fullCount = Math.floor(rounded);
  const hasHalf = rounded % 1 === 0.5;
  const emptyCount = Math.floor(5 - rounded);

  if (!rating)
    return (
      <View style={styles.container}>
        {new Array(5).fill(0).map((_, index) => (
          <SVG.Icon.RatingStartNotRated key={index} width={12} height={12} />
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

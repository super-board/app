import React from "react";

import {Image, StyleSheet} from "react-native";

type Props = {
  imageUrl: string;
};

export default function ReviewThumbnailImage({imageUrl}: Props) {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/images/fallback/board-game-fallback.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {width: 72, height: 72},
});

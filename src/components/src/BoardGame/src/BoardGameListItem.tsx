import React, {memo} from "react";

import {Image, StyleSheet, Text, View} from "react-native";

import typography from "@/constants/typography";
import type {BoardGameSummary} from "@/store";

import RatingIcons from "../../RatingIcons";

function BoardGameListItem({boardGame}: {boardGame: BoardGameSummary}) {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={require("@/assets/images/fallback/board-game-fallback.png")}
        style={styles.thumbnail}
      />
      <View style={styles.contentContainer}>
        <Text style={[typography.subhead01, typography.textWhite]}>{boardGame.name}</Text>
        <RatingIcons rating={boardGame.averageRating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {flexDirection: "row", gap: 8},
  thumbnail: {width: 72, height: 72},
  contentContainer: {flexDirection: "column", gap: 4},
});

export default memo(BoardGameListItem);

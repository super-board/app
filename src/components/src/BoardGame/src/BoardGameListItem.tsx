import React, {memo} from "react";

import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks/navigation";
import type {BoardGameSummary} from "@/store";

import RatingIcons from "../../RatingIcons";

function BoardGameListItem({boardGame}: {boardGame: BoardGameSummary}) {
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={navigateToBoardGameDetails}>
      <Image
        source={require("@/assets/images/fallback/board-game-fallback.png")}
        style={styles.thumbnail}
      />
      <View style={styles.contentContainer}>
        <Text style={[typography.subhead01, typography.textWhite]}>{boardGame.name}</Text>
        <RatingIcons rating={boardGame.averageRating} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {flexDirection: "row", gap: 8},
  thumbnail: {width: 72, height: 72},
  contentContainer: {flexDirection: "column", gap: 4},
});

export default memo(BoardGameListItem);

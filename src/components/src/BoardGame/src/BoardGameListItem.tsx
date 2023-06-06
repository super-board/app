import React, {memo} from "react";

import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks";
import type {BoardGameSummary} from "@/types";

import RatingIcons from "../../RatingIcons";

function BoardGameListItem({boardGame}: {boardGame: BoardGameSummary}) {
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);

  return (
    <Pressable style={styles.itemContainer} onPress={navigateToBoardGameDetails}>
      <Image
        source={require("@/assets/images/fallback/board-game-fallback.png")}
        style={styles.thumbnail}
      />
      <View style={styles.contentContainer}>
        <Text style={[typography.subhead01, typography.textWhite]}>{boardGame.name}</Text>
        <RatingIcons rating={boardGame.averageRating} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {flexDirection: "row", gap: 8},
  thumbnail: {width: 72, height: 72},
  contentContainer: {flexDirection: "column", gap: 4},
});

export default memo(BoardGameListItem);

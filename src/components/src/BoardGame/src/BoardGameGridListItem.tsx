import React, {memo} from "react";

import {Dimensions, Image, Pressable, StyleSheet, Text} from "react-native";

import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks";
import type {BoardGameSummary} from "@/types";

function BoardGameGridListItem({
  boardGame,
}: {
  boardGame: Pick<BoardGameSummary, "id" | "name" | "image">;
}) {
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);

  return (
    <Pressable style={styles.itemContainer} onPress={navigateToBoardGameDetails}>
      <Image
        source={require("@/assets/images/fallback/board-game-fallback.png")}
        style={styles.thumbnail}
      />
      <Text style={[typography.subhead02, typography.textWhite]}>{boardGame.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {gap: 8, alignItems: "center"},
  thumbnail: {
    width: (Dimensions.get("window").width - 56) / 2,
    height: (Dimensions.get("window").width - 56) / 2,
  },
});

export default memo(BoardGameGridListItem);

import React, {memo} from "react";

import {Dimensions, Pressable, StyleProp, StyleSheet, Text, ViewStyle} from "react-native";
import FastImage from "react-native-fast-image";

import {network} from "@/constants/network";
import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks";
import type {BoardGameSummary} from "@/types";

type Props = {
  boardGame: Pick<BoardGameSummary, "id" | "name" | "image">;
  style?: StyleProp<ViewStyle>;
};

function BoardGameGridListItem({style, boardGame}: Props) {
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);

  return (
    <Pressable style={[styles.itemContainer, style]} onPress={navigateToBoardGameDetails}>
      <FastImage
        style={styles.thumbnail}
        source={{
          uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={[typography.subhead02, typography.textWhite, styles.title]}>
        {boardGame.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {gap: 8, alignItems: "center"},
  thumbnail: {
    width: (Dimensions.get("window").width - 56) / 2,
    height: (Dimensions.get("window").width - 56) / 2,
    borderRadius: 4,
  },
  title: {
    width: (Dimensions.get("window").width - 56) / 2,
    textAlign: "center",
  },
});

export default memo(BoardGameGridListItem);

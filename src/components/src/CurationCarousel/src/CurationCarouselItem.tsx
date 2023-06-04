import React, {memo} from "react";

import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

import effects from "@/constants/effects";
import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks";
import {BoardGameSummary} from "@/types";

type Props = {
  boardGame: BoardGameSummary;
};

function CurationCarouselItem({boardGame}: Props) {
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={navigateToBoardGameDetails}>
      {/* FIXME: item에서 이미지 source 불러오게 변경*/}
      <Image source={require("@/assets/images/fallback/board-game-fallback.png")} />
      <Text
        style={[
          typography.subhead01,
          typography.textWhite,
          typography.textCenter,
          effects.textDropShadow,
          styles.itemTitle,
        ]}>
        {boardGame.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {justifyContent: "center", alignItems: "center"},
  itemTitle: {marginTop: -12},
});

export default memo(CurationCarouselItem);

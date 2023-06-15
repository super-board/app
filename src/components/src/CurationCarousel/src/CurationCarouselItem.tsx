import React, {memo} from "react";

import {Pressable, StyleSheet, Text} from "react-native";
import FastImage from "react-native-fast-image";

import effects from "@/constants/effects";
import {network} from "@/constants/network";
import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks";
import {BoardGameSummary} from "@/types";

type Props = {
  boardGame: BoardGameSummary;
};

function CurationCarouselItem({boardGame}: Props) {
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);

  return (
    <Pressable style={styles.itemContainer} onPress={navigateToBoardGameDetails}>
      <FastImage
        style={styles.image}
        source={{
          uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {justifyContent: "center", alignItems: "center"},
  itemTitle: {marginTop: 8},
  image: {width: "74%", aspectRatio: 1, borderRadius: 4},
});

export default memo(CurationCarouselItem);

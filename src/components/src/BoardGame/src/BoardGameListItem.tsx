import React, {memo} from "react";

import {useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Pressable, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";

import {network} from "@/constants/network";
import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";
import type {BoardGameSummary} from "@/types";
import {useReviewFormStore} from "@/zustand-stores";

import RatingIcons from "../../RatingIcons";

function BoardGameListItem({boardGame}: {boardGame: BoardGameSummary}) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const params = useRoute().params as {from: "write"};
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);
  const {selectBoardGame} = useReviewFormStore();

  const onPress = () => {
    if (params && params.from === "write") {
      selectBoardGame(boardGame);
      navigation.goBack();
      return;
    }

    navigateToBoardGameDetails();
  };

  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <FastImage
        style={styles.thumbnail}
        source={{
          uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.contentContainer}>
        <Text style={[typography.subhead01, typography.textWhite]}>{boardGame.name}</Text>
        <RatingIcons rating={boardGame.grade} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {flexDirection: "row", gap: 8},
  thumbnail: {width: 72, height: 72, borderRadius: 4},
  contentContainer: {flexDirection: "column", gap: 4},
});

export default memo(BoardGameListItem);

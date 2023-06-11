import React, {memo} from "react";

import {useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";

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

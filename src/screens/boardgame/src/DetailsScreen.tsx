import React from "react";

import {Image, ScrollView, StyleSheet, Text, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {OTBButton, RatingIcons, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {NumberFormatter} from "@/services/formatter";
import {useGetBoardGameDetailsQuery} from "@/store";

export default function DetailsScreen({navigation, route}: ScreenProps) {
  const {id} = route.params as {id: number};
  const {isLoading, data: boardGame} = useGetBoardGameDetailsQuery(id);

  const findTag = (type: string) => {
    const DEFAULT_TAG = {name: "-"};
    if (!boardGame) return DEFAULT_TAG;

    return boardGame.tagList.find(tag => tag.type === type) ?? DEFAULT_TAG;
  };

  if (isLoading || !boardGame) return null;

  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <View style={styles.basicInfoContainer}>
        <View style={styles.thumbnailContainer}>
          <Image
            style={styles.thumbnail}
            source={require("@/assets/images/fallback/board-game-fallback.png")}
          />
          <View style={styles.likesContainer}>
            <SVG.Icon.Favorite width={32} height={32} />
            <Text style={[typography.subhead03, typography.textWhite, effects.textDropShadow]}>
              {NumberFormatter.toCompactNumber(boardGame.favoriteCount)}
            </Text>
          </View>
        </View>
        <SizedBox height={16} />
        <Text style={[typography.headline, typography.textWhite]}>{boardGame.name}</Text>
        <SizedBox height={4} />
        <View style={styles.ratingContainer}>
          <RatingIcons rating={boardGame.averageRating} size={16} />
          <Text style={[typography.body02, typography.textWhite]}>
            {boardGame.averageRating.toFixed(2)}
          </Text>
        </View>
      </View>

      <SizedBox height={24} />
      <View style={styles.tagsContainer}>
        <View style={styles.tagsRow}>
          <View style={styles.tags}>
            <SVG.Icon.Players width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>
              {findTag("PLAYERS").name}
            </Text>
          </View>
          <View style={styles.tags}>
            <SVG.Icon.PlayTime width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>
              {findTag("PLAY_TIME").name}
            </Text>
          </View>
        </View>
        <View style={styles.tagsRow}>
          <View style={styles.tags}>
            <SVG.Icon.Category width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>
              {findTag("CATEGORY").name}
            </Text>
          </View>
          <View style={styles.tags}>
            <SVG.Icon.Age width={24} height={24} />
            <Text style={[typography.subhead02, typography.textWhite]}>{findTag("AGE").name}</Text>
          </View>
        </View>
      </View>
      <SizedBox height={24} />

      <Text style={[typography.bodyLong02, typography.textWhite]}>{boardGame.description}</Text>

      <OTBButton style={{marginVertical: 16}} type="basic-primary" text="내 리뷰 작성하기" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  basicInfoContainer: {
    alignItems: "center",
  },
  thumbnailContainer: {position: "relative"},
  thumbnail: {width: 222, height: 222, borderRadius: 4},
  likesContainer: {position: "absolute", top: 8, right: 8, alignItems: "center"},
  ratingContainer: {flexDirection: "row", gap: 8, alignItems: "center"},
  tagsContainer: {gap: 8},
  tagsRow: {flexDirection: "row", gap: 8},
  tags: {
    flex: 1,
    height: 48,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack800,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

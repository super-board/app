import React from "react";

import {Image, StyleSheet, Text, View} from "react-native";

import typography from "@/constants/typography";
import {useGetBestReviewsQuery} from "@/services/api";

import LevelIcon from "./LevelIcon";
import RatingIcons from "./RatingIcons";
import SizedBox from "./SizedBox";

export default function () {
  const {isLoading, data: bestReviews} = useGetBestReviewsQuery();

  if (isLoading || !bestReviews) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      {bestReviews.map((review, index) => (
        <View key={review.id} style={styles.listItemContainer}>
          <Text style={[typography.subhead03, typography.textWhite, styles.index]}>
            {index + 1}
          </Text>

          <SizedBox width={6} />
          <Image
            style={styles.thumbnailImage}
            source={require("@/assets/images/fallback/board-game-fallback.png")}
          />
          <SizedBox width={8} />

          <View style={styles.contentContainer}>
            <Text
              style={[typography.subhead02, typography.textWhite]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {review.title}
            </Text>
            <View style={styles.authorContainer}>
              <Text style={[typography.caption, typography.textWhite]}>
                {review.author.nickname}
              </Text>
              <LevelIcon level={review.author.level} />
            </View>
            <Text style={[typography.subhead03, typography.textWhite]}>
              {review.boardGame.name}
            </Text>
            <RatingIcons rating={review.grade} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: "100%", gap: 16},
  listItemContainer: {
    width: "100%",
    height: 104,
    flexDirection: "row",
  },
  index: {width: 13},
  thumbnailImage: {width: 104, height: 104},
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

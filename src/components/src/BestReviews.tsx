import React from "react";

import {StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";

import {api} from "@/api";
import {network} from "@/constants/network";
import typography from "@/constants/typography";
import {useRefetchQuery} from "@/hooks";

import {LevelIcon} from "./Level";
import ProfileImage from "./ProfileImage";
import RatingIcons from "./RatingIcons";
import SizedBox from "./SizedBox";

export default function BestReviews() {
  const {isLoading, data: paginatedBestReviews} = useRefetchQuery(
    ["review/best"],
    api.review.fetchBestReviews,
  );

  if (isLoading || !paginatedBestReviews) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      {paginatedBestReviews.content.map((review, index) => (
        <View key={review.id} style={styles.listItemContainer}>
          <Text style={[typography.subhead03, typography.textWhite, styles.index]}>
            {index + 1}
          </Text>

          <SizedBox width={6} />
          <FastImage
            style={styles.thumbnailImage}
            source={{
              uri: `${network.IMAGE_BASE_URL}/${review.boardgameImage}`,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <SizedBox width={8} />

          <View style={styles.contentContainer}>
            <Text
              style={[typography.subhead02, typography.textWhite]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {review.content}
            </Text>
            <View style={styles.authorContainer}>
              <ProfileImage width={16} height={16} type={review.profileCharacter} />
              <Text style={[typography.caption, typography.textWhite]}>
                {review.writerNickname}
              </Text>
              <LevelIcon level={review.writerLevel} />
            </View>
            <Text
              style={[typography.subhead03, typography.textWhite]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {review.boardGameTitle}
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
  thumbnailImage: {width: 104, height: 104, borderRadius: 4},
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

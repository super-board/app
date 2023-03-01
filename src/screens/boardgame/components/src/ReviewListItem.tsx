import React, {memo, useCallback, useState} from "react";

import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {DateTimeFormatter, NumberFormatter} from "@/services/formatter";
import type {ReviewDetails} from "@/store";

import AuthorChip from "./AuthorChip";
import ReviewImageSlider from "./ReviewImageSlider";
import ReviewThumbnailImage from "./ReviewThumbnailImage";

const MAX_LINES = 3;

function ReviewListItem({review}: {review: ReviewDetails}) {
  const [hasEllipsis, setHasEllipsis] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(MAX_LINES);

  const onTextLayout = useCallback((e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length > MAX_LINES) setHasEllipsis(true);
  }, []);

  const onToggleExpand = () => {
    setNumberOfLines(isExpanded ? MAX_LINES : undefined);
    setIsExpanded(state => !state);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AuthorChip author={review.author} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.button}>
            <SVG.Icon.Chat width={20} height={20} />
            {review.commentCount ? (
              <Text style={[typography.body02, typography.textWhite]}>
                {NumberFormatter.toCompactNumber(review.commentCount)}
              </Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.button}>
            <SVG.Icon.Favorite width={20} height={20} />
            {review.likeCount ? (
              <Text style={[typography.body02, typography.textWhite]}>
                {NumberFormatter.toCompactNumber(review.likeCount)}
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <View style={isExpanded ? styles.contentExpandedContainer : styles.contentCollapsedContainer}>
        {isExpanded && review.images.length ? (
          <ReviewImageSlider imageUrls={review.images} />
        ) : null}
        <Text
          style={[typography.body02, typography.textWhite, {flex: 1}]}
          onTextLayout={onTextLayout}
          numberOfLines={numberOfLines}
          ellipsizeMode="tail">
          {review.content}
        </Text>
        {!isExpanded && review.images.length ? (
          <ReviewThumbnailImage imageUrl={review.images[0]} />
        ) : null}
      </View>

      <View style={[styles.row]}>
        <View style={styles.timestampContainer}>
          <Text style={[typography.body02, styles.timestamp]}>
            {DateTimeFormatter.toJoinedDate(review.createAt)}
          </Text>
          <Text style={[typography.body02, styles.timestamp]}>
            {DateTimeFormatter.toJoinedTime(review.createAt)}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={[typography.body02, typography.textWhite, typography.underline]}>
              수정
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <Text style={[typography.body02, typography.textWhite, typography.underline]}>
              삭제
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {hasEllipsis || review.images.length > 1 ? (
        <TouchableOpacity activeOpacity={1} style={styles.expandButton} onPress={onToggleExpand}>
          {isExpanded ? (
            <SVG.Icon.Collapse width={24} height={24} />
          ) : (
            <SVG.Icon.ExpandMore width={24} height={24} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: colors.OTBBlack800,
  },
  row: {flexDirection: "row", justifyContent: "space-between"},
  contentCollapsedContainer: {flexDirection: "row", gap: 8},
  contentExpandedContainer: {flexDirection: "column", gap: 8},
  buttonsContainer: {flexDirection: "row", gap: 8},
  button: {flexDirection: "row", alignItems: "center", gap: 4},
  timestampContainer: {flexDirection: "row", alignItems: "center", gap: 8},
  timestamp: {color: colors.OTBBlack500},
  expandButton: {width: "100%", paddingTop: 10, justifyContent: "center", alignItems: "center"},
});

export default memo(ReviewListItem);

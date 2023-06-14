import React from "react";

import {useInfiniteQuery} from "@tanstack/react-query";
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

import CommentListItem from "./CommentListItem";

type Props = {
  boardGameId: number;
  reviewId: number;
  style?: StyleProp<ViewStyle>;
};

export default function CommentList({boardGameId, reviewId, style}: Props) {
  const {isLoading, data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    ["comments", boardGameId, reviewId],
    ({pageParam = 0}) =>
      api.comment.fetchComments({boardGameId, reviewId, limit: 3, offset: 3 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const comments = data?.pages.flatMap(page => page.content);

  if (isLoading || !data) return <View style={[styles.container, style]} />;

  return (
    <View style={[styles.container, style]}>
      {comments?.map(comment => (
        <CommentListItem
          key={comment.id}
          boardGameId={boardGameId}
          reviewId={reviewId}
          comment={comment}
        />
      ))}

      {hasNextPage ? (
        <Pressable
          style={styles.moreButton}
          onPress={() => fetchNextPage({pageParam: data!.pageParams.length})}>
          <Text style={[typography.body02, styles.moreButtonText]}>댓글 더보기</Text>
          <SVG.Icon.ExpandMore width={20} height={20} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 16,
  },
  moreButton: {height: 40, flexDirection: "row", justifyContent: "center", alignItems: "center"},
  moreButtonText: {
    color: colors.OTBBlack200,
  },
});

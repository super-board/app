import React, {useState} from "react";

import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useGetCommentsQuery} from "@/store";

import CommentListItem from "./CommentListItem";

type Props = {
  boardGameId: number;
  reviewId: number;
  style?: StyleProp<ViewStyle>;
};

export default function CommentList({boardGameId, reviewId, style}: Props) {
  const [page, setPage] = useState(1);
  const {isLoading, data: paginatedComments} = useGetCommentsQuery({boardGameId, reviewId, page});

  const onMoreComments = () => setPage(state => state + 1);

  if (isLoading || !paginatedComments) return <View style={[styles.container, style]} />;

  return (
    <View style={[styles.container, style]}>
      {paginatedComments.content.map((comment, index) => (
        <CommentListItem key={comment.id + index} comment={comment} />
      ))}

      {paginatedComments.hasNext ? (
        <TouchableOpacity activeOpacity={1} style={styles.moreButton} onPress={onMoreComments}>
          <Text style={[typography.body02, styles.moreButtonText]}>댓글 더보기</Text>
          <SVG.Icon.ExpandMore width={20} height={20} />
        </TouchableOpacity>
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

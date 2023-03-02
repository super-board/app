import React, {memo} from "react";

import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {DateTimeFormatter} from "@/services/formatter";
import type {CommentDetails} from "@/store";

import AuthorChip from "./AuthorChip";

function CommentListItem({comment}: {comment: CommentDetails}) {
  return (
    <View style={styles.container}>
      <AuthorChip author={comment.author} />

      <Text style={[typography.body02, typography.textWhite, {flex: 1}]}>{comment.content}</Text>

      <View style={[styles.row]}>
        <View style={styles.timestampContainer}>
          <Text style={[typography.body02, styles.timestamp]}>
            {DateTimeFormatter.toJoinedDate(comment.createdAt)}
          </Text>
          <Text style={[typography.body02, styles.timestamp]}>
            {DateTimeFormatter.toJoinedTime(comment.createdAt)}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          {/* TODO: 댓글 수정 화면 디자인 완료되면 작성하기 */
          /* <TouchableOpacity activeOpacity={1}>
            <Text style={[typography.body02, typography.textWhite, typography.underline]}>
              수정
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={1}>
            <Text style={[typography.body02, typography.textWhite, typography.underline]}>
              삭제
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    backgroundColor: colors.OTBBlack800,
  },
  row: {flexDirection: "row", justifyContent: "space-between"},
  buttonsContainer: {flexDirection: "row", gap: 8},
  timestampContainer: {flexDirection: "row", alignItems: "center", gap: 8},
  timestamp: {color: colors.OTBBlack500},
});

export default memo(CommentListItem);

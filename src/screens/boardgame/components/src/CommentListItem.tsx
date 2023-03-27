import React, {memo} from "react";

import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {DateTimeFormatter} from "@/services/formatter";
import {CommentDetails} from "@/store";

import {useDialogModals, useMyMemberInfo} from "../../hooks";
import AuthorChip from "./AuthorChip";

function CommentListItem({comment}: {comment: CommentDetails}) {
  const {isLoginUser, isAdmin} = useMyMemberInfo();
  const {
    isDeleteModalVisible,
    openDeleteModal,
    closeDeleteModal,
    isReportModalVisible,
    openReportModal,
    closeReportModal,
  } = useDialogModals();

  const onDelete = async () => {
    // TODO: 리뷰 삭제 요청 날리기
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const onReport = async () => {
    // TODO: 리뷰 신고 요청 날리기
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <>
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

          {isAdmin() ? (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity activeOpacity={1}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  숨김
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {!isAdmin() && isLoginUser(comment.author.id) ? (
            <View style={styles.buttonsContainer}>
              {/* TODO: 댓글 수정 화면 디자인 완료되면 활성화하기
            <TouchableOpacity activeOpacity={1}>
              <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                수정
              </Text>
            </TouchableOpacity> */}
              <Pressable onPress={openDeleteModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  삭제
                </Text>
              </Pressable>
            </View>
          ) : null}

          {!isAdmin() && !isLoginUser(comment.author.id) ? (
            <View style={styles.buttonsContainer}>
              <Pressable onPress={openReportModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  신고
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>

      <Modal.Dialog
        visible={isDeleteModalVisible}
        title="삭제하시겠습니까?"
        confirmText="삭제"
        onConfirm={onDelete}
        onRequestClose={closeDeleteModal}
      />
      <Modal.Dialog
        visible={isReportModalVisible}
        title="신고하시겠습니까?"
        confirmText="신고"
        onConfirm={onReport}
        onRequestClose={closeReportModal}
      />
    </>
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

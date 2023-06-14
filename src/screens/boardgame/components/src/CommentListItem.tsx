import React, {memo} from "react";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, StyleSheet, Text, View} from "react-native";

import {api} from "@/api";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useLoginInfo, useModal} from "@/hooks";
import {DateTimeFormatter} from "@/services/formatter";
import {CommentDetails} from "@/types";

import {useDialogModals} from "../../hooks";
import AuthorChip from "./AuthorChip";

type Props = {
  boardGameId: number;
  reviewId: number;
  comment: CommentDetails;
};

function CommentListItem({boardGameId, reviewId, comment}: Props) {
  const {isLoginUser, isAdmin} = useLoginInfo();
  const {
    isDeleteModalVisible,
    openDeleteModal,
    closeDeleteModal,
    isReportModalVisible,
    openReportModal,
    closeReportModal,
  } = useDialogModals();
  const {
    visible: isHideModalVisible,
    openModal: openHideModal,
    closeModal: closeHideModal,
  } = useModal();

  const queryClient = useQueryClient();
  const invalidateQueries = () => {
    queryClient.invalidateQueries(["boardgames/reviews"]);
    queryClient.invalidateQueries(["comments"]);
  };
  const {mutate: deleteComment} = useMutation(["comments/delete"], api.comment.deleteComment, {
    onSuccess: invalidateQueries,
  });
  const {mutate: hideComment} = useMutation(["admin/comments/hide"], api.admin.hideComment, {
    onSuccess: invalidateQueries,
  });
  const {mutate: reportComment} = useMutation(["comments/report"], api.report.report, {
    onSuccess: invalidateQueries,
  });

  const onDelete = () => {
    deleteComment({boardGameId, reviewId, commentId: comment.id});
  };

  const onReport = () => {
    reportComment({id: comment.id, type: "COMMENT"});
  };

  const onHide = () => {
    hideComment(comment.id);
  };

  return (
    <>
      <View style={styles.container}>
        <AuthorChip
          author={{
            id: comment.writerId,
            profileCharacter: comment.profileCharacter,
            nickname: comment.nickname,
            level: comment.writerLevel,
          }}
        />

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
            {isAdmin() ? (
              <Pressable onPress={openHideModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  숨김
                </Text>
              </Pressable>
            ) : null}

            {isLoginUser(comment.writerId) ? (
              <>
                <Pressable>
                  <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                    수정
                  </Text>
                </Pressable>
                <Pressable onPress={openDeleteModal}>
                  <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                    삭제
                  </Text>
                </Pressable>
              </>
            ) : null}

            {!isAdmin() && !isLoginUser(comment.writerId) ? (
              <Pressable onPress={openReportModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  신고
                </Text>
              </Pressable>
            ) : null}
          </View>
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
      <Modal.Dialog
        visible={isHideModalVisible}
        title="숨김처리 하시겠습니까?"
        confirmText="확인"
        onConfirm={onHide}
        onRequestClose={closeHideModal}
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

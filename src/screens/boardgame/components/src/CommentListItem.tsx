import React, {memo} from "react";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";

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
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [newComment, setNewComment] = React.useState(comment.content);

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
  const {mutate: updateComment, isLoading: isUpdatingComment} = useMutation(
    ["comment/update"],
    api.comment.updateComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        setIsEditMode(false);
      },
    },
  );
  const canSubmit = newComment.length >= 10 && !isUpdatingComment;

  const onDelete = () => {
    deleteComment({boardGameId, reviewId, commentId: comment.id});
  };

  const onReport = () => {
    reportComment({id: comment.id, type: "COMMENT"});
  };

  const onHide = () => {
    hideComment(comment.id);
  };

  const onUpdateComment = () => {
    updateComment({boardGameId, reviewId, commentId: comment.id, content: newComment});
  };

  const onCancel = () => {
    setNewComment(comment.content);
    setIsEditMode(false);
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

        {isEditMode ? (
          <View style={{width: "100%", flexDirection: "row", gap: 4}}>
            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textarea}
                multiline={true}
                value={newComment}
                onChangeText={setNewComment}
                cursorColor={colors.white}
                placeholder="최소 10자 이상 입력해주세요"
                placeholderTextColor={colors.OTBBlack500}
                maxLength={200}
              />
              <Text style={[typography.caption, styles.letterCounter]}>
                {newComment.length}/200
              </Text>
            </View>
            <View style={{gap: 4}}>
              <Pressable
                style={canSubmit ? styles.submitButton : styles.disabledButton}
                onPress={onUpdateComment}
                disabled={!canSubmit}>
                <Text
                  style={[
                    typography.subhead03,
                    canSubmit ? typography.textWhite : {color: colors.OTBBlack500},
                  ]}>
                  수정
                </Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={onCancel}>
                <Text style={[typography.subhead03, {color: colors.OTBBlack}]}>취소</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <Text style={[typography.body02, typography.textWhite, {flex: 1}]}>
              {comment.content}
            </Text>

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
                    <Pressable onPress={() => setIsEditMode(true)}>
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
          </>
        )}
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
  textareaContainer: {flex: 1, position: "relative"},
  textarea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 42,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack700,
    color: colors.white,
  },
  letterCounter: {
    position: "absolute",
    bottom: 8,
    right: 8,
    color: colors.OTBBlack500,
  },
  submitButton: {
    width: 46,
    height: 36,
    borderRadius: 4,
    backgroundColor: colors.OTBBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    width: 46,
    height: 36,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack100,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    width: 46,
    height: 36,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack700,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(CommentListItem);

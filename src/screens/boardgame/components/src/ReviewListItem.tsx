import React, {memo, useCallback, useState} from "react";

import {useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from "react-native";

import * as SVG from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useLoginInfo, useModal} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";
import CommentList from "@/screens/boardgame/components/src/CommentList";
import {DateTimeFormatter, NumberFormatter} from "@/services/formatter";
import {ReviewDetails} from "@/types";
import {useAuthStore} from "@/zustand-stores";

import {useDialogModals} from "../../hooks";
import AuthorChip from "./AuthorChip";
import CommentForm from "./CommentForm";
import ReviewImageSlider from "./ReviewImageSlider";
import ReviewThumbnailImage from "./ReviewThumbnailImage";

const MAX_LINES = 3;

function ReviewListItem({review}: {review: ReviewDetails}) {
  const [hasEllipsis, setHasEllipsis] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(MAX_LINES);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {isLoginUser, isAdmin} = useLoginInfo();
  const didLogin = useAuthStore(state => !!state.refreshToken);

  const {
    isEditModalVisible,
    openEditModal,
    closeEditModal,
    isDeleteModalVisible,
    openDeleteModal,
    closeDeleteModal,
    isReportModalVisible,
    openReportModal,
    closeReportModal,
  } = useDialogModals();
  const {
    visible: isSignUpModalVisible,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal();

  const onTextLayout = useCallback((e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length > MAX_LINES) setHasEllipsis(true);
  }, []);

  const onToggleExpand = () => {
    if (!didLogin) {
      openSignUpModal();
      return;
    }

    setNumberOfLines(isExpanded ? MAX_LINES : undefined);
    setIsExpanded(state => !state);
  };

  const onEdit = () => {
    // TODO: 리뷰 수정페이지로 이동하기
  };

  const onDelete = async () => {
    // TODO: 리뷰 삭제 요청 날리기
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const onReport = async () => {
    // TODO: 리뷰 신고 요청 날리기
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  const onSignUp = () => {
    navigation.navigate("RegisterEmailVerificationScreen");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <AuthorChip author={review.author} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.button}
              onPress={() => setIsCommentsVisible(state => !state)}>
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

        <View
          style={isExpanded ? styles.contentExpandedContainer : styles.contentCollapsedContainer}>
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
              {DateTimeFormatter.toJoinedDate(review.createdAt)}
            </Text>
            <Text style={[typography.body02, styles.timestamp]}>
              {DateTimeFormatter.toJoinedTime(review.createdAt)}
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

          {!isAdmin() && isLoginUser(review.author.id) ? (
            <View style={styles.buttonsContainer}>
              <Pressable onPress={openEditModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  수정
                </Text>
              </Pressable>
              <Pressable onPress={openDeleteModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  삭제
                </Text>
              </Pressable>
            </View>
          ) : null}

          {!isAdmin() && !isLoginUser(review.author.id) ? (
            <View style={styles.buttonsContainer}>
              <Pressable onPress={openReportModal}>
                <Text style={[typography.body02, typography.textWhite, typography.underline]}>
                  신고
                </Text>
              </Pressable>
            </View>
          ) : null}
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

        {isCommentsVisible ? (
          <View style={{paddingLeft: 20, gap: 16}}>
            <CommentList boardGameId={(route.params as {id: number}).id} reviewId={review.id} />
            <CommentForm />
          </View>
        ) : null}
      </View>

      <Modal.Dialog
        visible={isEditModalVisible}
        IconComponent={<SVG.Icon.Edit width={48} height={48} />}
        title="수정하시겠습니까?"
        confirmText="수정"
        onConfirm={onEdit}
        onRequestClose={closeEditModal}
      />
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
        visible={isSignUpModalVisible}
        IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
        title={"더 많은 보드게임 정보가\n궁금하신가요?"}
        description={"회원가입하고 재미있는\n보드게임 정보를 확인하세요!"}
        confirmText="회원가입"
        onConfirm={onSignUp}
        onRequestClose={closeSignUpModal}
      />
    </>
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

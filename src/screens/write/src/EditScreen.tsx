import React from "react";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {Modal, OTBButton} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal} from "@/hooks";
import {useReviewFormStore} from "@/zustand-stores";

import {ImageForm} from "../components";

export default function EditScreen({navigation, route}: ScreenProps) {
  const {reviewId} = route.params as {reviewId: number};
  const {boardGame, grade, images, content, updateGrade, addImage, updateContent, reset} =
    useReviewFormStore();
  const canSubmit = boardGame && content.length >= 20;
  const hasUnsavedChanges = images.length || content.length >= 20;
  const {
    visible: isSubmitModalVisible,
    openModal: openSubmitModal,
    closeModal: closeSubmitModal,
  } = useModal();
  const {
    visible: isCancelModalVisible,
    openModal: openCancelModal,
    closeModal: closeCancelModal,
  } = useModal();

  const queryClient = useQueryClient();
  const {mutate: writeReview, isLoading} = useMutation(
    ["boardgames/reviews/edit"],
    api.review.editReview,
    {
      onSuccess: (_, {boardGameId}) => {
        reset();
        queryClient.invalidateQueries(["boardgames/reviews"]);
        setTimeout(() => {
          navigation.goBack();
          navigation.navigate("BoardGameDetailsScreen", {id: boardGameId});
        }, 1);
      },
    },
  );

  const onSubmit = () =>
    writeReview({
      boardGameId: boardGame!.id,
      reviewId,
      form: {
        grade,
        images: images.map(image => image.base64!),
        content,
      },
    });
  const onCancel = () => {
    reset();
    setTimeout(navigation.goBack, 1);
  };

  /* 뒤로가기 이벤트 발생 시 경고 */
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", e => {
        if (!hasUnsavedChanges) return reset();

        e.preventDefault();
        openCancelModal();
      }),
    [navigation, hasUnsavedChanges],
  );

  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <Text style={[typography.subhead01, typography.textWhite, styles.title]}>보드게임</Text>
      <View style={styles.search}>
        <Text
          style={[typography.body01, {color: boardGame ? colors.white : colors.OTBBlack500}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {boardGame ? boardGame.name : "보드게임을 선택해주세요."}
        </Text>
      </View>
      <Text style={[typography.subhead01, typography.textWhite, styles.title, {marginTop: 32}]}>
        게임 평점
      </Text>

      <View style={styles.rate}>
        <StarRating
          rating={grade}
          onChange={updateGrade}
          color={colors.OTBBlueLight3}
          starStyle={{marginHorizontal: 0}}
        />
        <Text style={[typography.subhead01, typography.textWhite, styles.rateText]}>
          {grade.toFixed(1)}
        </Text>
      </View>
      <View style={styles.review}>
        <Text style={[typography.subhead01, typography.textWhite, styles.title]}>리뷰 작성</Text>
        <Text style={styles.subtitle}>({images.length}/5 , 사진 1개당 400KB 제한)</Text>
      </View>

      {images.length ? (
        <ImageForm />
      ) : (
        <Pressable onPress={addImage} style={styles.imageBtn}>
          <SVG.Icon.Camera width={20} height={16} color={colors.OTBBlack} />
          <Text style={styles.imageText}>사진 추가</Text>
        </Pressable>
      )}
      <View>
        <TextInput
          style={[styles.textInput, typography.body01, typography.textWhite]}
          value={content}
          onChangeText={updateContent}
          placeholder="리뷰를 작성해주세요. (20자 이상)"
          placeholderTextColor={colors.OTBBlack500}
          multiline={true}
        />
        <Text style={[typography.caption, styles.count]}>({content.length}/1000)</Text>
      </View>

      <View style={styles.buttonContainer}>
        <OTBButton
          type="medium-secondary"
          text="취소"
          style={[styles.button, {marginRight: 4}]}
          onPress={navigation.goBack}
        />
        <OTBButton
          type="medium-primary"
          text="수정"
          style={[styles.button, {marginLeft: 4}]}
          onPress={openSubmitModal}
          disabled={!canSubmit || isLoading}
        />
      </View>

      <Modal.Dialog
        visible={isSubmitModalVisible}
        IconComponent={<SVG.Icon.Submit width={48} height={48} />}
        title="리뷰를 수정하시겠습니까?"
        confirmText="확인"
        onConfirm={onSubmit}
        onRequestClose={closeSubmitModal}
      />
      <Modal.Dialog
        visible={isCancelModalVisible}
        title={"지금 취소시\n작성된 내용이 사라집니다."}
        description="그래도 작성을 취소하시겠습니까?"
        confirmText="확인"
        cancelText="돌아가기"
        onConfirm={onCancel}
        onRequestClose={closeCancelModal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {marginBottom: 8},
  subtitle: {color: colors.OTBBlack500},
  review: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    alignItems: "center",
  },
  rate: {flexDirection: "row", alignItems: "center"},
  rateText: {marginLeft: 8, marginTop: 8},
  imageBtn: {
    backgroundColor: colors.OTBBlack200,
    height: 48,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imageText: {
    color: colors.OTBBlack,
    fontWeight: "700",
    lineHeight: 20,
    marginLeft: 8,
  },
  textInput: {
    height: 200,
    backgroundColor: colors.OTBBlack700,
    marginTop: 8,
    borderRadius: 4,
    padding: 12,
    textAlignVertical: "top",
    paddingTop: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    borderRadius: 4,
    flex: 1,
  },
  count: {
    position: "absolute",
    right: 8,
    bottom: 8,
    color: colors.OTBBlack500,
  },
  search: {
    height: 48,
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
    overflow: "hidden",
  },
});

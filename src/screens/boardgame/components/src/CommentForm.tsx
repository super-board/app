import React, {useState} from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack/lib/typescript/src/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useLoginInfo, useModal} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";
import {useAuthStore} from "@/zustand-stores";

import AuthorChip from "./AuthorChip";

type Props = {
  boardGameId: number;
  reviewId: number;
};

export default function CommentForm({boardGameId, reviewId}: Props) {
  const [comment, setComment] = useState("");
  const {isLoading, loginInfo} = useLoginInfo();
  const didLogin = useAuthStore(state => !!state.refreshToken);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    visible: isSignUpModalVisible,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal();

  const queryClient = useQueryClient();
  const {mutate: postComment, isLoading: isPostingComment} = useMutation(
    ["comment/post"],
    api.comment.postComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        setComment("");
      },
    },
  );
  const canSubmit = didLogin && comment.length >= 10 && !isPostingComment;

  const checkDidLogIn = () => {
    if (!didLogin) openSignUpModal();
  };

  const onSignUp = () => {
    navigation.navigate("OnboardingLoginScreen");
  };

  const onPostComment = () => postComment({boardGameId, reviewId, content: comment});

  return (
    <View style={styles.container}>
      <AuthorChip
        author={
          loginInfo ?? {id: 1, nickname: "비회원", level: "PLAYER", profileCharacter: "PROFILE_1"}
        }
      />

      <View style={styles.row}>
        <View style={styles.textareaContainer}>
          <Pressable onPress={checkDidLogIn}>
            <TextInput
              style={styles.textarea}
              multiline={true}
              value={comment}
              onChangeText={setComment}
              cursorColor={colors.white}
              placeholder="최소 10자 이상 입력해주세요"
              placeholderTextColor={colors.OTBBlack500}
              maxLength={200}
              editable={didLogin}
            />
          </Pressable>
          <Text style={[typography.caption, styles.letterCounter]}>{comment.length}/200</Text>
        </View>

        <Pressable
          style={canSubmit ? styles.submitButton : styles.disabledButton}
          onPress={onPostComment}
          disabled={!canSubmit}>
          <Text
            style={[
              typography.subhead03,
              canSubmit ? typography.textWhite : {color: colors.OTBBlack500},
            ]}>
            등록
          </Text>
        </Pressable>
      </View>

      <Modal.Dialog
        visible={isSignUpModalVisible}
        IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
        title={"더 많은 보드게임 정보가\n궁금하신가요?"}
        description={"회원가입하고 재미있는\n보드게임 정보를 확인하세요!"}
        confirmText="회원가입"
        onConfirm={onSignUp}
        onRequestClose={closeSignUpModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: 12},
  row: {flexDirection: "row", gap: 4},
  textareaContainer: {flex: 1, position: "relative"},
  textarea: {
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
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.OTBBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    width: 46,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack700,
    justifyContent: "center",
    alignItems: "center",
  },
});

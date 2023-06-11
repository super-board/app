import React, {useState} from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack/lib/typescript/src/types";
import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import {SVG} from "@/assets/svgs";
import {Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useLoginInfo, useModal} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";
import {useAuthStore} from "@/zustand-stores";

import AuthorChip from "./AuthorChip";

export default function CommentForm() {
  const [comment, setComment] = useState("");
  const {isLoading, loginInfo} = useLoginInfo();
  const didLogin = useAuthStore(state => !!state.refreshToken);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    visible: isSignUpModalVisible,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal();

  const checkDidLogIn = () => {
    if (!didLogin) openSignUpModal();
  };

  const onSignUp = () => {
    navigation.navigate("OnboardingLoginScreen");
  };

  if (isLoading || !loginInfo) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <AuthorChip author={loginInfo} />

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

        <TouchableOpacity style={styles.submitButton} disabled={!didLogin}>
          <Text style={[typography.subhead03, typography.textWhite]}>등록</Text>
        </TouchableOpacity>
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
});

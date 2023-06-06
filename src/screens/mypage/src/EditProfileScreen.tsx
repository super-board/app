import React from "react";

import {useFocusEffect} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";
import {Pressable, StyleSheet, View} from "react-native";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {DecoratedTextInput, Modal, OTBButton, ProfileImage} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useLoginInfo, useModal, useTextInput} from "@/hooks";
import {Validator} from "@/services/validator";

export default function EditProfileScreen({navigation}: ScreenProps) {
  const {isLoading, loginInfo} = useLoginInfo();
  const {
    value: nickname,
    isValid: isValidNickname,
    onChangeText: onChangeNickname,
    reset: resetNickname,
  } = useTextInput(Validator.isValidNickname);
  const {visible, openModal, closeModal} = useModal();

  const {
    mutate: checkDuplicateNicknameRegistered,
    isLoading: isCheckingNickname,
    isSuccess: canSubmit,
    isError: shouldAlertDuplicateNickname,
    reset: resetDuplicateNicknameError,
  } = useMutation(["members/nickname-check"], api.member.checkDuplicateNickname);
  const {
    isLoading: isUpdatingProfile,
    mutate: updateProfile,
    isSuccess: isSuccessToUpdateProfile,
  } = useMutation(["members/mypage/profile"], api.myPage.updateProfile);

  const onUpdateProfileCharacter = () => {
    navigation.navigate("MyPageEditProfileCharacterScreen", {
      profileCharacter: loginInfo!.profileCharacter,
    });
  };

  /* 중복된 닉네임이 존재하면 Alert */
  React.useEffect(() => {
    if (shouldAlertDuplicateNickname) openModal();
  }, [shouldAlertDuplicateNickname]);

  /* 사용할 수 있는 닉네임이면 변경 */
  React.useEffect(() => {
    if (canSubmit) {
      updateProfile({nickname, profileCharacter: loginInfo!.profileCharacter});
    }
  }, [canSubmit]);

  /* 변경 완료되면 마이페이지로 되돌아가기 */
  React.useEffect(() => {
    if (isSuccessToUpdateProfile) navigation.goBack();
  }, [isSuccessToUpdateProfile]);

  useFocusEffect(
    React.useCallback(() => {
      resetNickname();
      resetDuplicateNicknameError();
    }, []),
  );

  if (isLoading || !loginInfo) return <View style={style.screenWithAppBarContainer} />;

  return (
    <View style={style.screenWithAppBarContainer}>
      <View style={styles.contentContainer}>
        <Pressable style={styles.editProfileButton} onPress={onUpdateProfileCharacter}>
          <ProfileImage type={loginInfo.profileCharacter} width={96} height={96} />
          <View style={styles.buttonOverlay}>
            <View style={styles.eclipse} />
            <SVG.Icon.PlusRound width={48} height={48} color={colors.white} />
          </View>
        </Pressable>
        <DecoratedTextInput
          label="닉네임"
          value={nickname}
          onChangeText={onChangeNickname}
          placeholder="닉네임"
          instructionText="특수기호 제외하여 10자이내 한글로 입력해주세요."
          isValid={isValidNickname}
          invalidText="닉네임 형식이 맞지 않습니다. 다시 입력해주세요."
          maxLength={10}
        />
      </View>

      <OTBButton
        type="basic-primary"
        text="확인"
        onPress={() => checkDuplicateNicknameRegistered(nickname)}
        disabled={isCheckingNickname || isUpdatingProfile || !nickname.length || !isValidNickname}
      />

      <Modal.Warn
        visible={visible}
        title="이미 사용중인 닉네임입니다."
        description="다시 입력해주세요."
        onRequestClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  editProfileButton: {
    position: "relative",
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonOverlay: {
    position: "absolute",
    top: 20,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  eclipse: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 9999,
    backgroundColor: colors.OTBBlue,
    opacity: 0.6,
  },
});

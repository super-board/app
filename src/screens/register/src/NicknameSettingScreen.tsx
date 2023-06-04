import React, {useCallback, useEffect} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";

import {api} from "@/api";
import {
  DecoratedTextInput,
  FlexEmptyFill,
  KeyboardView,
  Modal,
  OTBButton,
  ScreenTitle,
  SizedBox,
} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useModal, useTextInput} from "@/hooks";
import {Validator} from "@/services/validator";

export default function NicknameSettingScreen({navigation, route}: ScreenProps) {
  const {
    value: nickname,
    isValid: isValidNickname,
    onChangeText: onChangeNickname,
    reset: resetNickname,
  } = useTextInput(Validator.isValidNickname);
  const {visible, openModal, closeModal} = useModal();

  const {
    mutate: checkDuplicateNicknameRegistered,
    isLoading,
    isSuccess: canSubmit,
    isError: shouldAlertDuplicateNickname,
    reset: resetDuplicateNicknameError,
  } = useMutation(["members/nickname-check"], api.member.checkDuplicateNickname);

  /* 중복된 닉네임이 존재하면 Alert */
  useEffect(() => {
    if (shouldAlertDuplicateNickname) openModal();
  }, [shouldAlertDuplicateNickname]);

  /* 사용할 수 있는 닉네임이면 다음 화면으로 이동 */
  useEffect(() => {
    if (canSubmit) navigation.navigate("RegisterTagSelectScreen", {...route.params, nickname});
  }, [canSubmit]);

  useFocusEffect(
    useCallback(() => {
      resetNickname();
      resetDuplicateNicknameError();
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <ScreenTitle title="닉네임 설정" description="서비스 이용에 사용할 닉네임을 설정해주세요" />
      <SizedBox height={40} />

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

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={() => checkDuplicateNicknameRegistered(nickname)}
        disabled={isLoading || !nickname.length || !isValidNickname}
      />
      <SizedBox height={36} />

      <Modal.Warn
        visible={visible}
        title="이미 사용중인 닉네임입니다."
        description="다시 입력해주세요."
        onRequestClose={closeModal}
      />
    </KeyboardView>
  );
}

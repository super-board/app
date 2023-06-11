import React, {useCallback, useEffect, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";

import {api} from "@/api";
import {
  DecoratedTextInput,
  FlexEmptyFill,
  KeyboardView,
  Modal,
  OTBButton,
  PasswordHideDecoration,
  SizedBox,
} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useModal, useTextInput} from "@/hooks";
import {Validator} from "@/services/validator";

export default function UpdatePasswordScreen({navigation, route}: ScreenProps) {
  const {
    value: password,
    isValid: isValidPassword,
    onChangeText: onChangePassword,
    reset: resetPasswordInput,
  } = useTextInput(Validator.isValidPassword);
  const {
    value: passwordRe,
    isValid: isValidPasswordRe,
    onChangeText: onChangePasswordRe,
    reset: resetPasswordRe,
  } = useTextInput(passwordRe => password === passwordRe);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordRe, setHidePasswordRe] = useState(true);
  const {visible, openModal, closeModal} = useModal();

  const {
    mutate: resetPassword,
    isSuccess,
    isLoading,
  } = useMutation(["members/mypage/password"], api.myPage.resetPassword);

  const onSubmit = () => {
    const {password: oldPassword} = route.params as {password: string};
    if (oldPassword === password) return openModal();
    resetPassword(password);
  };

  /* 비밀번호 재설정에 성공하면 화면 이동 */
  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
      navigation.goBack();
    }
  }, [isSuccess]);

  useFocusEffect(
    useCallback(() => {
      resetPasswordInput();
      resetPasswordRe();
      setHidePassword(true);
      setHidePasswordRe(true);
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <SizedBox height={24} />

      <DecoratedTextInput
        label="새로운 비밀번호"
        value={password}
        onChangeText={onChangePassword}
        instructionText="8~20자 이내로 숫자, 특수문자, 영문자 중 2가지를 포함하여 입력해주세요."
        isValid={isValidPassword}
        invalidText="비밀번호 형식이 맞지 않습니다. 다시 입력해주세요."
        maxLength={20}
        secureTextEntry={hidePassword}
        rightDecorationComponent={
          <PasswordHideDecoration
            style={{marginRight: 16}}
            hide={hidePassword}
            toggleHide={() => setHidePassword(state => !state)}
          />
        }
      />
      <SizedBox height={16} />
      <DecoratedTextInput
        label="비밀번호 확인"
        value={passwordRe}
        onChangeText={onChangePasswordRe}
        isValid={isValidPasswordRe}
        invalidText="입력하신 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
        secureTextEntry={hidePasswordRe}
        rightDecorationComponent={
          <PasswordHideDecoration
            style={{marginRight: 16}}
            hide={hidePasswordRe}
            toggleHide={() => setHidePasswordRe(state => !state)}
          />
        }
      />

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="확인"
        onPress={onSubmit}
        disabled={!password || !isValidPassword || !isValidPasswordRe || isLoading}
      />
      <SizedBox height={36} />

      <Modal.Alert
        visible={visible}
        title="현재 사용 중인 비밀번호입니다."
        description="새로운 비밀번호를 입력해주세요."
        onRequestClose={closeModal}
      />
    </KeyboardView>
  );
}

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

export default function CheckPasswordScreen({navigation, route}: ScreenProps) {
  const {
    value: password,
    isValid: isValidPassword,
    onChangeText: onChangePassword,
    reset: resetPasswordInput,
  } = useTextInput(Validator.isValidPassword);
  const [hidePassword, setHidePassword] = useState(true);
  const {visible, openModal, closeModal} = useModal();

  const {
    mutate: checkPassword,
    isSuccess,
    isLoading,
    isError,
    reset: resetWrongPasswordError,
  } = useMutation(["auth/password-check"], api.auth.checkCurrentPassword);

  const onSubmit = () => checkPassword(password);

  /* 비밀번호 확인에 성공하면 변경 페이지로 이동 */
  useEffect(() => {
    if (isSuccess) navigation.navigate("MyPageUpdatePasswordScreen", {password});
  }, [isSuccess]);

  /* 비밀번호 확인에 실패하면 모달 */
  useEffect(() => {
    if (isError) openModal();
  }, [isError]);

  useFocusEffect(
    useCallback(() => {
      resetPasswordInput();
      setHidePassword(true);
      resetWrongPasswordError();
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <SizedBox height={24} />
      <DecoratedTextInput
        label="현재 비밀번호"
        value={password}
        onChangeText={onChangePassword}
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

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={onSubmit}
        disabled={!password || !isValidPassword || isLoading}
      />
      <SizedBox height={36} />

      <Modal.Alert
        visible={visible}
        title="비밀번호가 일치하지 않습니다."
        description="비밀번호를 다시 입력해주세요."
        onRequestClose={closeModal}
      />
    </KeyboardView>
  );
}

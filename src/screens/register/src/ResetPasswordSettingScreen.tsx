import React, {useCallback, useEffect, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";

import {
  DecoratedTextInput,
  FlexEmptyFill,
  KeyboardView,
  OTBButton,
  PasswordHideDecoration,
  ScreenTitle,
  SizedBox,
} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useTextInput} from "@/hooks/form";
import {Validator} from "@/services/validator";
import {ResetPasswordForm, useUpdatePasswordMutation} from "@/store";

export default function ResetPasswordSettingScreen({navigation, route}: ScreenProps) {
  const {
    value: password,
    isValid: isValidPassword,
    onChangeText: onChangePassword,
    reset: resetPassword,
  } = useTextInput(Validator.isValidPassword);
  const {
    value: passwordRe,
    isValid: isValidPasswordRe,
    onChangeText: onChangePasswordRe,
    reset: resetPasswordRe,
  } = useTextInput(passwordRe => password === passwordRe);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordRe, setHidePasswordRe] = useState(true);

  const [updatePassword, {isSuccess}] = useUpdatePasswordMutation();

  const onSubmit = () => {
    const {email, resetToken} = route.params as ResetPasswordForm;
    updatePassword({email, password, resetToken});
  };

  /* 비밀번호 재설정에 성공하면 화면 이동 */
  useEffect(() => {
    if (isSuccess)
      navigation.reset({
        index: 1,
        routes: [{name: "OnboardingWelcomeScreen"}, {name: "LoginScreen"}],
      });
  }, [isSuccess]);

  useFocusEffect(
    useCallback(() => {
      resetPassword();
      resetPasswordRe();
      setHidePassword(true);
      setHidePasswordRe(true);
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <ScreenTitle title="비밀번호 입력" description="로그인에 사용할 비밀번호를 입력하세요." />
      <SizedBox height={40} />

      <DecoratedTextInput
        label="비밀번호"
        value={password}
        onChangeText={onChangePassword}
        instructionText="8~20자 이내로 숫자, 특수문자, 영문자 중 2가지를 포함하여 입력해주세요."
        isValid={isValidPassword}
        invalidText="8~20자 이내로 숫자, 특수문자, 영문자 중 2가지를 포함하여 입력해주세요."
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
      <SizedBox height={42} />
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
        disabled={!password || !isValidPassword || !isValidPasswordRe}
      />
      <SizedBox height={36} />
    </KeyboardView>
  );
}

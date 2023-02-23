import React, {useCallback, useEffect, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import Animated, {FadeIn, FadeInUp, FadeOutDown} from "react-native-reanimated";

import {
  DecoratedTextInput,
  FlexEmptyFill,
  KeyboardView,
  Modal,
  OTBButton,
  ScreenTitle,
  SizedBox,
  TimerDecoration,
} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useTextInput} from "@/hooks/form";
import {useModal} from "@/hooks/modal";
import {
  useCheckDuplicateEmailRegisteredMutation,
  useSendVerificationMailMutation,
  useVerifyAuthCodeMutation,
} from "@/store";

export default function ResetPasswordEmailVerificationScreen({navigation}: ScreenProps) {
  const {value: email, onChangeText: onChangeEmail, reset: resetEmail} = useTextInput();
  const {value: authCode, onChangeText: onChangeAuthCode, reset: resetAuthCode} = useTextInput();
  const {
    visible: unregisteredEmailModalVisible,
    openModal: openUnregisteredEmailModal,
    closeModal: closeUnregisteredEmailModal,
  } = useModal();
  const {
    visible: invalidAuthCodeModalVisible,
    openModal: openInvalidAuthCodeModal,
    closeModal: closeInvalidAuthCodeModal,
  } = useModal();
  const {
    visible: expiredAuthCodeModalVisible,
    openModal: openExpiredAuthCodeModal,
    closeModal: closeExpiredAuthCodeModal,
  } = useModal();

  const [
    checkIsRegisteredMail,
    {
      isSuccess: shouldAlertUnregisteredEmailError,
      isError: canSendVerificationMail,
      reset: resetUnregisteredEmailError,
    },
  ] = useCheckDuplicateEmailRegisteredMutation();
  const [sendVerificationMail, {data: clientKeyResponse, fulfilledTimeStamp}] =
    useSendVerificationMailMutation();
  const [
    verifyAuthCode,
    {
      isSuccess: canSubmit,
      isError: shouldAlertInvalidAuthCodeError,
      reset: resetInvalidAuthCodeError,
    },
  ] = useVerifyAuthCodeMutation();
  const [didSendVerificationMail, setDidSendVerificationMail] = useState(false);
  const [canResendVerificationMail, setCanResendVerificationMail] = useState(false);
  const [isAuthCodeExpired, setIsAuthCodeExpired] = useState(false);

  const onResendVerificationMail = () => {
    setCanResendVerificationMail(false);
    resetAuthCode();
    sendVerificationMail(email);
  };

  const onNextPage = () => {
    const payload = {authCode, clientKey: clientKeyResponse!.clientKey};
    verifyAuthCode(payload);
  };

  /* 가입된 이메일이 없으면 Alert */
  useEffect(() => {
    if (shouldAlertUnregisteredEmailError) openUnregisteredEmailModal();
  }, [shouldAlertUnregisteredEmailError]);

  /* 사용할 수 있는 이메일을 입력하면 인증메일 보내기 */
  useEffect(() => {
    if (!canSendVerificationMail) return;

    sendVerificationMail(email);
    setDidSendVerificationMail(true);
  }, [canSendVerificationMail]);

  /* 인증메일 발송 후 Side Effect */
  useEffect(() => {
    function disableResendButton() {
      const RESEND_INTERVAL = 10 * 1000;
      setCanResendVerificationMail(false);
      return setTimeout(() => {
        setCanResendVerificationMail(true);
      }, RESEND_INTERVAL);
    }

    function expireAuthCodeAfter(seconds: number) {
      const TO_BE_EXPIRED = seconds * 1000;
      setIsAuthCodeExpired(false);
      return setTimeout(() => {
        setIsAuthCodeExpired(true);
      }, TO_BE_EXPIRED);
    }

    const timeouts = [disableResendButton(), expireAuthCodeAfter(180)];
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [fulfilledTimeStamp]);

  /* 잘못된 AuthCode를 입력하면 Alert */
  useEffect(() => {
    if (shouldAlertInvalidAuthCodeError) openInvalidAuthCodeModal();
  }, [shouldAlertInvalidAuthCodeError]);

  /* 올바른 AuthCode를 입력하면 다음 화면으로 이동 */
  useEffect(() => {
    if (canSubmit) navigation.navigate("ResetPasswordSettingScreen", {email});
  }, [canSubmit]);

  /* AuthCode가 만료되면 Alert */
  useEffect(() => {
    if (didSendVerificationMail && isAuthCodeExpired) openExpiredAuthCodeModal();
  }, [isAuthCodeExpired]);

  /* 내비게이션 이동 중 화면이 Focus될 때 Input 초기화 */
  useFocusEffect(
    useCallback(() => {
      setDidSendVerificationMail(false);
      resetEmail();
      resetAuthCode();
      resetUnregisteredEmailError();
      resetInvalidAuthCodeError();
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <ScreenTitle
        title="비밀번호 재설정"
        description="비밀번호 재설정을 위해 가입하신 이메일을 입력해주세요."
      />
      <SizedBox height={40} />

      <DecoratedTextInput
        label="이메일"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="ontheboard@gmail.com"
        instructionText="인증번호를 받기 위해 정확한 이메일 주소를 입력해주세요"
        keyboardType="email-address"
        maxLength={320}
        editable={!didSendVerificationMail}
      />
      <SizedBox height={8} />
      {didSendVerificationMail ? (
        <>
          <OTBButton
            type="medium-secondary"
            text="인증번호 다시 받기"
            onPress={onResendVerificationMail}
            disabled={!canResendVerificationMail}
          />
          <Animated.View
            layout={FadeIn.duration(500).delay(200)}
            entering={FadeInUp}
            exiting={FadeOutDown}>
            <SizedBox height={24} />
            <DecoratedTextInput
              label="인증번호"
              value={authCode}
              onChangeText={onChangeAuthCode}
              placeholder="123456"
              keyboardType="phone-pad"
              maxLength={6}
              rightDecorationComponent={
                <TimerDecoration key={fulfilledTimeStamp} style={{paddingRight: 20}} />
              }
            />
          </Animated.View>
        </>
      ) : (
        <OTBButton
          type="medium-primary"
          text="인증번호 받기"
          onPress={() => checkIsRegisteredMail(email)}
          disabled={!email}
        />
      )}

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={onNextPage}
        disabled={isAuthCodeExpired || authCode.length !== 6}
      />
      <SizedBox height={36} />

      <Modal.Warn
        visible={unregisteredEmailModalVisible}
        title="이미 사용중인 이메일 주소입니다."
        description="다시 입력해주세요."
        onRequestClose={() => {
          resetUnregisteredEmailError();
          closeUnregisteredEmailModal();
        }}
      />
      <Modal.Warn
        visible={invalidAuthCodeModalVisible}
        title="인증 번호가 맞지 않습니다."
        description="다시 입력해주세요."
        onRequestClose={() => {
          resetInvalidAuthCodeError();
          closeInvalidAuthCodeModal();
        }}
      />
      <Modal.Warn
        visible={expiredAuthCodeModalVisible}
        title="인증 번호 입력 시간이 만료되었습니다."
        description="인증번호 다시 받기를 클릭하세요."
        onRequestClose={closeExpiredAuthCodeModal}
      />
    </KeyboardView>
  );
}

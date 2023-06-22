import React, {useCallback, useEffect, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";
import Animated, {FadeIn, FadeInUp, FadeOutDown} from "react-native-reanimated";

import {api} from "@/api";
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
import {useModal, useTextInput} from "@/hooks";
import {Validator} from "@/services/validator";

export default function EmailVerificationScreen({navigation}: ScreenProps) {
  const [mailSentTimestamp, setMailSentTimestamp] = React.useState(new Date().getTime());
  const [didSendVerificationMail, setDidSendVerificationMail] = useState(false);
  const [canResendVerificationMail, setCanResendVerificationMail] = useState(false);
  const [isAuthCodeExpired, setIsAuthCodeExpired] = useState(false);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);
  const clearTimeouts = () => {
    timeouts.forEach(clearTimeout);
    setTimeouts([]);
  };
  const {
    value: email,
    isValid: isValidEmail,
    onChangeText: onChangeEmail,
    reset: resetEmail,
  } = useTextInput(Validator.isValidEmail);
  const {value: authCode, onChangeText: onChangeAuthCode, reset: resetAuthCode} = useTextInput();
  const {
    visible: duplicateEmailModalVisible,
    openModal: openDuplicateEmailModal,
    closeModal: closeDuplicateEmailModal,
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

  const {mutate: checkDuplicateEmailRegistered, reset: resetDuplicateEmailError} = useMutation(
    ["members/mail-check"],
    api.member.checkDuplicateEmail,
    {
      onSuccess: () => {
        sendVerificationMail(email);
        setDidSendVerificationMail(true);
      },
      onError: openDuplicateEmailModal,
    },
  );
  const {mutate: sendVerificationMail, data: clientKeyResponse} = useMutation(
    ["auth/code"],
    api.auth.sendVerificationMail,
    {
      onSuccess: () => {
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

        setMailSentTimestamp(new Date().getTime());
        setTimeouts([disableResendButton(), expireAuthCodeAfter(180)]);
      },
    },
  );
  const {mutate: verifyAuthCode, reset: resetInvalidAuthCodeError} = useMutation(
    ["auth/code-check"],
    api.auth.verifyAuthCode,
    {
      onSuccess: () => {
        navigation.navigate("RegisterPasswordSettingScreen", {email});
        clearTimeouts();
      },
      onError: openInvalidAuthCodeModal,
    },
  );

  const onResendVerificationMail = () => {
    setCanResendVerificationMail(false);
    resetAuthCode();
    sendVerificationMail(email);
  };

  const onNextPage = () => {
    const payload = {authCode, clientKey: clientKeyResponse!.clientKey};
    verifyAuthCode(payload);
  };

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
      resetDuplicateEmailError();
      resetInvalidAuthCodeError();
      clearTimeouts();
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <ScreenTitle
        title="이메일 본인인증"
        description="서비스 로그인을 위한 이메일 입력 및 이메일 본인 확인을 해주세요."
      />
      <SizedBox height={40} />

      <DecoratedTextInput
        label="이메일"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="ontheboard@gmail.com"
        instructionText="인증번호를 받기 위해 정확한 이메일 주소를 입력해주세요"
        isValid={isValidEmail}
        invalidText="이메일 형식이 맞지 않습니다. 다시 입력해주세요."
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
                <TimerDecoration key={mailSentTimestamp} style={{paddingRight: 20}} />
              }
            />
          </Animated.View>
        </>
      ) : (
        <OTBButton
          type="medium-primary"
          text="인증번호 받기"
          onPress={() => checkDuplicateEmailRegistered(email)}
          disabled={!email || !isValidEmail}
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

      <Modal.Alert
        visible={duplicateEmailModalVisible}
        title="이미 사용중인 이메일 주소입니다."
        description="다시 입력해주세요."
        onRequestClose={() => {
          resetDuplicateEmailError();
          closeDuplicateEmailModal();
        }}
      />
      <Modal.Alert
        visible={invalidAuthCodeModalVisible}
        title="인증 번호가 맞지 않습니다."
        description="다시 입력해주세요."
        onRequestClose={() => {
          resetInvalidAuthCodeError();
          closeInvalidAuthCodeModal();
        }}
      />
      <Modal.Alert
        visible={expiredAuthCodeModalVisible}
        title="인증 번호 입력 시간이 만료되었습니다."
        description="인증번호 다시 받기를 클릭하세요."
        onRequestClose={closeExpiredAuthCodeModal}
      />
    </KeyboardView>
  );
}

import React, {useCallback, useEffect, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import Animated, {FadeIn, FadeInUp, FadeOutDown} from "react-native-reanimated";

import {FlexEmptyFill, KeyboardView, Modal, OTBButton, SizedBox} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useModal} from "@/hooks/modal";
import {useTextInput} from "@/screens/register/hooks";
import {Validator} from "@/services/validator";

import {DecoratedTextInput, ScreenTitle, TimeDecoration} from "../components";

export default function EmailVerificationScreen({navigation}: ScreenProps) {
  const {
    value: email,
    isValid: isEmailValid,
    onChangeText: onChangeEmail,
    reset: resetEmail,
  } = useTextInput(Validator.isValidEmail);
  const {value: authCode, onChangeText: onChangeAuthCode, reset: resetAuthCode} = useTextInput();
  const {visible, openModal, closeModal} = useModal();
  const [hasSentVerificationMail, setHasSentVerificationMail] = useState(false);
  const [canResendVerificationMail, setCanResendVerificationMail] = useState(false);
  useFocusEffect(
    useCallback(() => {
      resetEmail();
      resetAuthCode();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        isValid={isEmailValid}
        invalidText="이메일 형식이 맞지 않습니다. 다시 입력해주세요."
        keyboardType="email-address"
        maxLength={40}
      />
      <SizedBox height={8} />
      {hasSentVerificationMail ? (
        <>
          <OTBButton
            type="medium-secondary"
            text="인증번호 다시 받기"
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
              placeholder="12345"
              keyboardType="phone-pad"
              maxLength={5}
              rightDecorationComponent={<TimeDecoration style={{paddingRight: 20}} />}
            />
          </Animated.View>
        </>
      ) : (
        <OTBButton
          type="medium-primary"
          text="인증번호 받기"
          disabled={!email || !isEmailValid}
        />
      )}

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={() => navigation.navigate("RegisterPasswordSettingScreen")}
        disabled={authCode.length !== 5}
      />
      <SizedBox height={36} />

      <Modal.Warn
        visible={visible}
        title={"이미 사용중인 이메일 주소입니다."}
        description="다시 입력해주세요"
        onRequestClose={closeModal}
      />
    </KeyboardView>
  );
}

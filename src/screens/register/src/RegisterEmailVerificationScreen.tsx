import React, {useState} from "react";

import Animated, {FadeIn, FadeInUp, FadeOutDown} from "react-native-reanimated";

import {
  FlexEmptyFill,
  KeyboardView,
  Modal,
  OTBButton,
  SizedBox,
  TextInput,
  Title,
} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import {useModal} from "@/hooks/modal";

export default function EmailVerificationScreen({navigation}: ScreenProps) {
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [authValid, setAuthValid] = useState(false);
  const [authView, setAuthView] = useState(false);
  const {visible, openModal, closeModal} = useModal();

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <Title
        title={"이메일 본인인증"}
        subTitle={"서비스 로그인을 위한 이메일 입력 및 이메일 본인 확인을 해주세요."}
      />
      <TextInput
        title="이메일"
        placeholder="ontheboard@gmail.com"
        bottomText="인증번호를 받기 위해 정확한 이메일 주소를 입력해주세요"
        text={email}
        setText={setEmail}
        setIsValid={setEmailValid}
        type="register"
        keyboardType="email-address"
        maxLength={40}
      />
      <OTBButton
        type="medium-primary"
        text="인증번호 받기"
        onPress={() => setAuthView(!authView)}
        disabled={!emailValid}
      />
      {authView ? (
        <Animated.View
          layout={FadeIn.duration(500).delay(200)}
          entering={FadeInUp}
          exiting={FadeOutDown}>
          <TextInput
            title="인증번호"
            placeholder="12345"
            text={authNum}
            setText={setAuthNum}
            setIsValid={setAuthValid}
            style={{marginTop: 32}}
            keyboardType="phone-pad"
            maxLength={5}
          />
        </Animated.View>
      ) : null}

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={() => navigation.navigate("RegisterPasswordSettingScreen")}
        disabled={authNum.length !== 5}
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

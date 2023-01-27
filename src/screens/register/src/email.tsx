import React, {useEffect, useState} from "react";

import Animated, {FadeIn, FadeInUp, FadeOutDown} from "react-native-reanimated";

import {Button, KeyboardView, Modal, TextInput, Title} from "@/components";
import {Cacnel} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

export default function Email(props: ScreenProps) {
  const {navigation, route} = props;
  const {type = "register"} = route.params || {};
  const [email, setEmail] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [authValid, setAuthValid] = useState(false);
  const [authView, setAuthView] = useState(false);
  const [warn, setWarn] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Cacnel />,
    });
  }, []);

  return (
    <KeyboardView>
      <Title
        title={type === "register" ? "이메일 본인인증" : "비밀번호 재설정"}
        subTitle={
          type === "register"
            ? "서비스 로그인을 위한 이메일 입력 및 이메일 본인 확인을 해주세요."
            : "비밀번호를 재설정을 위해 가입하신 이메일을 입력해 주세요."
        }
      />
      <TextInput
        title="이메일"
        placeholder="ontheboard@gmail.com"
        bottomText="인증번호를 받기 위해 정확한 이메일 주소를 입력해주세요"
        text={email}
        setText={setEmail}
        setIsValid={setEmailValid}
        type={type}
        keyboardType="email-address"
        maxLength={40}
      />
      <Button text="인증번호 받기" onPress={() => setAuthView(!authView)} disabled={!emailValid} />
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
      <Button
        text="다음"
        onPress={() => navigation.navigate("RegisterPassword", {email})}
        disabled={authNum.length !== 5}
        style={style.nextBtn}
      />
      <Modal.Warn
        visible={warn}
        setVisible={setWarn}
        title={type === "register" ? "이미 사용중인 이메일 주소입니다." : ""}
        subTitle="다시 입력해주세요"
        onRequestClose={() => setWarn(false)}
      />
    </KeyboardView>
  );
}

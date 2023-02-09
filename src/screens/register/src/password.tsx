import React, {useState} from "react";

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

const Password = ({navigation, route}: ScreenProps) => {
  const [password, setPassword] = useState("");
  const [_password, _setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [warn, setWarn] = useState(false);

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <Title title="비밀번호 입력" subTitle="로그인에 사용할 비밀번호를 입력하세요." />
      <TextInput
        title="비밀번호"
        text={password}
        setText={setPassword}
        setIsValid={setIsValid}
        bottomText={"8~20자 이내의 숫자, 특수문자, 영문자 중 2가지를 포함하여 입력해주세요."}
        type="register"
        maxLength={20}
      />
      <TextInput
        title="비밀번호 확인"
        text={password}
        setText={_setPassword}
        style={{marginTop: 24}}
        type="register"
        maxLength={20}
      />

      <FlexEmptyFill />
      <OTBButton
        type="basic-primary"
        text="다음"
        onPress={() => navigation.navigate("RegisterProfile", {...route.params, password})}
        disabled={!(isValid && password === _password)}
      />
      <SizedBox height={36} />

      <Modal.Warn
        visible={warn}
        title="이미 사용중인 닉네임 입니다."
        description="다시 입력해주세요"
        onRequestClose={() => setWarn(false)}
      />
    </KeyboardView>
  );
};

export default Password;

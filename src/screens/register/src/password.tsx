import React, {useEffect, useState} from "react";

import {View} from "react-native";

import {Button, Cacnel, KeyboardView, Modal, TextInput, Title} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

const Password = (props: ScreenProps) => {
  const {navigation, route} = props;
  const [password, setPassword] = useState("");
  const [_password, _setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [warn, setWarn] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Cacnel />,
    });
  }, []);

  return (
    <KeyboardView>
      <View style={{flex: 8}}>
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
      </View>
      <Button
        text="다음"
        onPress={() => navigation.navigate("RegisterProfile", {...route.params, password})}
        disabled={!(isValid && password === _password)}
        style={style.nextBtn}
      />
      <Modal.Warn
        visible={warn}
        setVisible={setWarn}
        title="이미 사용중인 닉네임 입니다."
        subTitle="다시 입력해주세요"
        onRequestClose={() => setWarn(false)}
      />
    </KeyboardView>
  );
};

export default Password;

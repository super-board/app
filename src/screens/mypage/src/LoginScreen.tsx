import React, {useState} from "react";

import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {FlexEmptyFill, KeyboardView, OTBButton, SizedBox, TextInput, Title} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

export default function LoginScreen({navigation}: ScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = {
    login: () => {},
    kakao: () => {},
    naver: () => {},
    register: () => {
      // navigation.navigate("RegisterEmailVerificationScreen");
      navigation.navigate("RegisterProfileSelectionScreen", {
        email: "floatim00@gmail.com",
        password: "asdf1234",
      });
    },
    findPassword: () => {
      navigation.navigate("FindPasswordEmailVerification");
    },
  };

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <Title title="로그인" />
      <TextInput
        title="이메일"
        placeholder="ontheboard@gmail.com"
        text={email}
        setText={setEmail}
      />
      <TextInput
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        text={password}
        setText={setPassword}
      />
      <View style={styles.findRegister}>
        <TouchableOpacity onPress={onPress.findPassword}>
          <Text style={styles.text}>비밀번호를 잊어버리셨나요?</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity onPress={onPress.register}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <FlexEmptyFill />

      <View style={styles.snsContainer}>
        <TouchableOpacity onPress={onPress.naver}>
          <SVG.Icon.Naver width={40} height={40} style={{marginRight: 24}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress.kakao}>
          <SVG.Icon.Kakao width={40} height={40} />
        </TouchableOpacity>
      </View>
      <SizedBox height={42} />
      <OTBButton type="basic-primary" text="로그인" onPress={onPress.login} />
      <SizedBox height={36} />
    </KeyboardView>
  );
}

const styles = StyleSheet.create({
  snsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  findRegister: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  verticalDivider: {
    borderRightWidth: 1,
    borderColor: "white",
    margin: 10,
    height: 14,
  },
});

import React, {useCallback, useEffect, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {
  DecoratedTextInput,
  FlexEmptyFill,
  KeyboardView,
  OTBButton,
  PasswordHideDecoration,
  SizedBox,
} from "@/components";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useSignInMutation} from "@/store";

export default function LoginScreen({navigation}: ScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const [signIn, {isLoading, isSuccess, isError}] = useSignInMutation();

  const onPress = {
    login: () => {
      setIsValidCredentials(true);
      signIn({email, password});
    },
    kakao: () => {},
    naver: () => {},
    register: () => {
      navigation.navigate("RegisterEmailVerificationScreen");
    },
    findPassword: () => {
      navigation.navigate("ResetPasswordEmailVerificationScreen");
    },
  };

  /* 로그인에 실패하면 invalidate */
  useEffect(() => {
    if (isError) setIsValidCredentials(false);
  }, [isError]);

  /* 로그인에 성공하면 토큰 저장 후 화면 이동 */
  useEffect(() => {
    if (isSuccess) navigation.reset({index: 0, routes: [{name: "BottomTabView"}]});
  }, [isSuccess]);

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
      setHidePassword(true);
      setIsValidCredentials(true);
    }, []),
  );

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <Text style={[typography.display04, typography.textWhite]}>로그인</Text>
      <SizedBox height={8} />

      <DecoratedTextInput
        label="이메일"
        value={email}
        onChangeText={setEmail}
        placeholder="ontheboard@gmail.com"
        isValid={isValidCredentials}
        hideInvalidText
        maxLength={320}
      />
      <DecoratedTextInput
        label="비밀번호"
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력해주세요."
        isValid={isValidCredentials}
        invalidText="이메일 혹은 비밀번호가 맞지 않습니다. 다시 입력해주세요."
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

      <SizedBox height={8} />

      <View style={styles.actionsContainer}>
        <TouchableOpacity activeOpacity={1} onPress={onPress.findPassword}>
          <Text style={[typography.body02, typography.textWhite]}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity activeOpacity={1} onPress={onPress.register}>
          <Text style={[typography.body02, typography.textWhite]}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <FlexEmptyFill />

      <View style={styles.snsContainer}>
        <TouchableOpacity onPress={onPress.naver}>
          <SVG.Icon.Naver width={48} height={48} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress.kakao}>
          <SVG.Icon.Kakao width={48} height={48} />
        </TouchableOpacity>
      </View>
      <SizedBox height={42} />
      <OTBButton
        type="basic-primary"
        text="로그인"
        onPress={onPress.login}
        disabled={!email || !password || isLoading}
      />
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
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalDivider: {
    borderRightWidth: 1,
    borderColor: "white",
    marginHorizontal: 8,
    height: 12.5,
  },
});

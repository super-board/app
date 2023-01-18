import React, {useState} from "react";

import {NavigationProp, ParamListBase, RouteProp} from "@react-navigation/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {Button, KeyboardView, TextInput, Title} from "@/components";
import style from "@/constants/style";

import * as SVG from "../../../assets/svgs";

const Login = (props: {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}) => {
  const {navigation, route} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = {
    login: () => {},
    kakao: () => {},
    naver: () => {},
    register: () => {
      navigation.navigate("RegisterEmail");
    },
    findPassword: () => {
      navigation.navigate("RegisterEmail", {type: "find"});
    },
  };

  return (
    <KeyboardView>
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
        <View style={styles.divider} />
        <TouchableOpacity onPress={onPress.register}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sns}>
        <TouchableOpacity onPress={onPress.naver}>
          <SVG.Icon.Naver width={40} height={40} style={{marginRight: 24}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress.kakao}>
          <SVG.Icon.Kakao width={40} height={40} />
        </TouchableOpacity>
      </View>
      <Button text="로그인" style={style.nextBtn} onPress={onPress.login} />
    </KeyboardView>
  );
};

export default Login;

const styles = StyleSheet.create({
  sns: {
    flexDirection: "row",
    marginTop: 56,
    justifyContent: "center",
    marginBottom: 42,
    position: "absolute",
    bottom: "20%",
    alignSelf: "center",
  },
  textInput: {
    padding: 24,
  },
  findRegister: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textDecorationLine: "underline",
  },
  divider: {
    borderRightWidth: 1,
    borderColor: "white",
    margin: 10,
    height: 14,
  },
});

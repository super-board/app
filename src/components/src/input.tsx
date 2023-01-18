import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

import {
  TextInput as DefTextInput,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import colors from "@/constants/colors";

import * as SVG from "../../assets/svgs";

type TextInputProps = DefTextInput["props"] & {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  text: string;
  setText: Function;
  title?: string;
  bottomText?: string;
  setIsValid?: Dispatch<SetStateAction<boolean>> | any;
  style?: ViewProps | any;
  type?: string;
  err?: string;
};

const TextInput = (props: TextInputProps) => {
  const {
    text,
    title,
    placeholder,
    keyboardType,
    bottomText,
    setText,
    setIsValid,
    style,
    type,
    err = "",
    ...otherProps
  } = props;
  const [errMsg, setErrMsg] = useState<string>(err);
  const [time, setTime] = useState(180000);
  const [security, setSecurity] = useState(
    title === "비밀번호" || title === "비밀번호 확인" ? true : false,
  );

  let timer: number;

  useEffect(() => {
    if (time > 0) timer = setTimeout(() => setTime(time - 1000), 1000);
    else clearTimeout(timer);
  }, [time]);

  const checkValid = (text: string) => {
    switch (title) {
      case "이메일":
        if (type === "register" || type === "find") {
          let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
          if (regex.test(text)) {
            setErrMsg("");
            setIsValid(true);
          } else {
            setErrMsg("이메일 형식이 맞지 않습니다. 다시 입력해주세요.");
            setIsValid(false);
          }
        } else {
        }

        break;
      case "인증번호":
        break;
      case "비밀번호":
        if (type === "register") {
          const num = text.search(/[0-9]/g);
          const eng = text.search(/[a-z]/gi);
          const spe = text.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

          if (text.length < 8 || text.length > 20) {
            setErrMsg("8~20자 이내의 숫자, 특수문자, 영문자 중 2가지를 포함하여 입력해주세요.");
            setIsValid(false);
          } else if (text.search(/\s/) != -1) {
            setErrMsg("비밀번호는 공백 없이 입력해주세요.");
            setIsValid(false);
          } else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
            setErrMsg("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
            setIsValid(false);
          } else {
            setIsValid(true);
            setErrMsg("");
          }
        } else {
        }

        break;
      case "비밀번호 확인":
        break;
      case "닉네임":
        const kor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        if (kor.test(text) && text.length <= 10) {
          setIsValid(true);
        } else {
          setErrMsg("닉네임 형식이 맞지 않습니다. 다시 입력해주세요.");
          setIsValid(false);
        }
        break;
      default:
        return true;
    }
  };

  const onChangeText = (text: string) => {
    setText(text);
    checkValid(text);
    if (!text.length) setErrMsg("");
  };

  const InsideComponent = () => {
    switch (title) {
      case "인증번호":
        return (
          <Text style={styles.timer}>
            {Math.floor(time / 60000)
              .toString()
              .padStart(2, "0")}
            :{(Math.floor(time % 60000) / 1000).toString().padStart(2, "0")}
          </Text>
        );
      case "비밀번호":
      case "비밀번호 확인":
        return (
          <TouchableOpacity onPress={() => setSecurity(!security)} style={styles.iconContainer}>
            {security ? (
              <SVG.Icon.ViewFalse style={styles.view} />
            ) : (
              <SVG.Icon.ViewTrue style={styles.view} />
            )}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{...style}}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.textInputContainer}>
        <DefTextInput
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          keyboardType={keyboardType}
          onChangeText={text => onChangeText(text)}
          {...otherProps}
          style={[styles.textInput, {borderColor: !errMsg ? "white" : colors.warning}]}
          editable
          secureTextEntry={security}
        />
        <InsideComponent />
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={[styles.bottomText, {color: !errMsg ? "grey" : colors.warning}]}>
          {!errMsg ? (text.length ? null : bottomText) : errMsg}
        </Text>
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    height: 52,
    width: "100%",
    padding: 12,
    color: "white",
  },
  bottomTextContainer: {
    alignItems: "center",
    margin: 8,
  },
  bottomText: {
    color: "grey",
    fontSize: 12,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timer: {
    color: colors.warning,
    position: "absolute",
    right: 20,
  },
  iconContainer: {
    justifyContent: "center",
  },
  view: {
    position: "absolute",
    right: 20,
    width: 18,
    height: 18,
  },
});

import { KeyboardTypeOptions, Text, TextInput as DefTextInput, StyleSheet, View, ViewStyle, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@/constants/colors';
import * as SVG from "../../assets/svgs";

type TextInputProps = DefTextInput["props"]&{
  placeholder?: string,
  keyboardType?: KeyboardTypeOptions,
  text: string,
  setText: Function,
  title?: string,
  bottomText?: string,
  setIsValid: Function,
  style?: ViewStyle
}
 
const TextInput = (props: TextInputProps) => {
  const {text, title, placeholder, keyboardType, bottomText, setText, setIsValid, style, ...otherProps} = props;
  const [errMsg, setErrMsg] = useState<string>("");
  const [time, setTime] = useState(10000);
  const [security, setSecurity] = useState(true);

  let timer: any;

  useEffect(()=> {
    if (time > 0) timer = setTimeout(()=> setTime(time - 1000), 1000);
    else clearTimeout(timer);
  }, [time])

  const checkValid = (text: string) => {
    switch(title) {
      case "이메일":
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(regex.test(text)) {
          setErrMsg("");
          setIsValid(true);
        } else {
          setErrMsg("이메일 형식이 맞지 않습니다. 다시 입력해주세요.");
          setIsValid(false);
        }
      break;
      case "인증번호":

      break;
      case "비밀번호":

      break;
      case "비밀번호 확인":

      break;
      default:
      
      return true;
    }
    
  }

  const onChangeText = (text: string) => {
    setText(text);
    checkValid(text);
    if(!text.length) setErrMsg("");
  }

  const InsideComponent = () => {
    switch(title) {
      case "인증번호":
        return (<Text style={styles.timer}>{(Math.floor(time/60000)).toString().padStart(2,"0")}:{(Math.floor(time%60000) / 1000).toString().padStart(2,"0")}</Text>);
      case "비밀번호": case "비밀번호 확인":
        return (
          <TouchableOpacity onPress={() => setSecurity(!security)} style={styles.iconContainer}>
            {security ? <SVG.Icon.ViewFalse style={styles.view}/> : <SVG.Icon.ViewTrue style={styles.view}/>}
          </TouchableOpacity> 
        );
      default:
      return null;
    }
  }

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
        <InsideComponent/>
      </View> 
      <View style={styles.bottomTextContainer}>
        <Text style={[styles.bottomText, {color: !errMsg ? "grey" : colors.warning}]}>{!errMsg ? text.length ? null : bottomText : errMsg}</Text>
      </View>
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginBottom: 8
  },
  textInput: {
    borderWidth: 1, 
    borderColor: "white",
    borderRadius: 4, 
    height: 52, 
    width: "100%", 
    padding: 12, 
    color: "white"
  },
  bottomTextContainer: {
    alignItems: "center",
    margin: 8
  },
  bottomText: {
    color: "grey",
    fontSize: 12
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
    width: 35, 
    height: 35
  },
  view: {
    position: "absolute",
    right: 55,
    width: 18,
    height: 18
  }
})
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import style from '@/constants/style'
import { Button, Modal, TextInput, Title } from '@/components'
import Navigation from '@/navigation'
import Animated, { FadeIn, FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'

const FindPassword = (props: {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<ParamListBase>
}) => {
  const {navigation, route} = props
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [authView, setAuthView] = useState(false);
  const [warn, setWarn] = useState(false);
  const [warnText, setWarnText] = useState("등록되지 않은 이메일 입니다.");
  const [auth, setAuth] = useState("");
  const [authValid, setAuthValid] = useState(false);

  const onPress = {
    auth: () => {
      setAuthView(true)
    },
    next: () => {
      Navigation.navigate("")
    }
  }
  return (
    <View style={style.container}>
      <Title 
        title="비밀번호 재설정"
        subTitle="비밀번호를 재설정을 위해 가입하신 이메일을 입력해 주세요."
      />

      <TextInput
        title="이메일"
        placeholder="ontheboard@gmail.com"
        bottomText="인증번호를 받기 위해 정확한 이메일 주소를 입력해주세요"
        text={email}
        setText={setEmail}
        setIsValid={setEmailValid}
        type="register"
      />

      <Button 
        text="인증번호 받기"
        onPress={onPress.auth}
        disabled={!emailValid}
      />

      {authView ? 
      <Animated.View 
        layout={FadeIn.duration(500).delay(200)}
        entering={FadeInUp}
        exiting={FadeOutDown}
      >
        <TextInput
          title="인증번호"
          placeholder="12345"
          text={auth}
          setText={setAuth}
          setIsValid={setAuthValid}
          style={{marginTop: 32}}
        />
      </Animated.View> : null}

      <Modal.Warn
        visible={warn}
        title={warnText}
        subTitle="다시 입력해주세요."
        onRequestClose={()=> setWarn(false)}
        button={
          <Button 
            text="확인"
            onPress={() => setWarn(false)}
            style={{marginBottom: 4}}
          />
        }
      />      

      <Button 
        text="다음"
        onPress={() => navigation.navigate("RegisterPassword", {email})}
        disabled={!emailValid}
        style={style.nextBtn}
      />

    </View>
  )
}

export default FindPassword

const styles = StyleSheet.create({})
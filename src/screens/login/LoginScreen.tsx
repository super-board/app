import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, Modal } from '@/components';

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [authValid, setAuthValid] = useState(false);

  const [modal, setModal] = useState(false);
  
  
  return (
    <View style={{backgroundColor: "#111B26", justifyContent: "center", flex: 1, padding: 24}}>
      <TextInput
        title="이메일"
        placeholder="ontheboard@gmail.com"
        bottomText="인증번호를 받기 위해 정확한 이메일 주소를 입력해주세요"
        text={email}
        setText={setEmail}
        setIsValid={setEmailValid}
      />
      <Button 
        text="인증번호 받기"
        onPress={() => setModal(true)}
        disabled={!emailValid}
      />
      <TextInput
        title="인증번호"
        placeholder="12345"
        text={auth}
        setText={setAuth}
        setIsValid={setAuthValid}
        style={{marginTop: 32}}
      />
      <TextInput
        title="비밀번호"
        placeholder="12345"
        text={auth}
        setText={setAuth}
        setIsValid={setAuthValid}
      />
      <TextInput
        title="비밀번호 확인"
        placeholder="12345"
        text={auth}
        setText={setAuth}
        setIsValid={setAuthValid}
      />
      <Modal.Warn
        visible={modal}
        title="이미 사용중인 이메일 주소입니다."
        subTitle="다시 입력해주세요"
        button={
          <Button 
            text="확인"
            onPress={() => setModal(false)}
            style={{marginBottom: 4}}
          />
        }
        onRequestClose={()=> setModal(false)}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
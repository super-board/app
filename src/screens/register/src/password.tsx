import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Cacnel, Title, TextInput } from '@/components'
import style from '@/constants/style';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

const Password = (props: {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<ParamListBase>
}) => {
  const {navigation, route} = props;
  const [password, setPassword] = useState("");
  const [_password, _setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: ()=> <Cacnel screen={"Login"}/>
    })
  }, [])
  
  return (
    <View style={style.container}>
      <Title
        title="비밀번호 입력"
        subTitle="로그인에 사용할 비밀번호를 입력하세요."
      /> 
      <TextInput
        title="비밀번호"
        text={password}
        setText={setPassword}
        setIsValid={setIsValid}
        bottomText={"8~20자 이내의 숫자, 특수문자, 영문자 중 2가지를 포함하여 입력해주세요."}
      />
      <TextInput
        title="비밀번호 확인"
        text={password}
        setText={_setPassword}
        style={{ marginTop: 24 }}      
      />
      <Button
        text="다음"
        onPress={() => navigation.navigate("RegisterProfile", {...route.params, password})}
        disabled={!(isValid && password === _password)}
        style={style.nextBtn}
      />
    </View>
  )
}

export default Password

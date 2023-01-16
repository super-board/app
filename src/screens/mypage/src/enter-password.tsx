import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import style from '@/constants/style'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'

const EnterPassword = (props: {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<ParamListBase>
}) => {
  const {navigation, route} = props
  
  return (
    <View style={style.container}>
      <Text>enter-password</Text>
    </View>
  )
}

export default EnterPassword

const styles = StyleSheet.create({})
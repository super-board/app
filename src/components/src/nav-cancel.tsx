import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

type CancelProps = TouchableOpacity["props"]&{
  screen: string
}
const Cacnel = (props: CancelProps) => {
  const navigation: any = useNavigation();
  const {screen} = props;

  return (
    <TouchableOpacity onPress={() => navigation.popToTop()}>
      <Text style={styles.text}>취소</Text>
    </TouchableOpacity>
  )
}

export default Cacnel

const styles = StyleSheet.create({
  text: {
    color: "white"
  }
})
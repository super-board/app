import { StyleSheet, Text, TouchableOpacity, ViewProps } from 'react-native'
import React from 'react'

type ButtonProps = { 
  onPress: () => void,
  text: string,
  disabled?: boolean,
  borderRadious?: number,
  height?: number, 
  style?: ViewProps | any
}

const Button = (props: ButtonProps) => {
  const {text, onPress, style, borderRadious=4, height=48, disabled, ...otherProps} = props;

  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.button, {borderRadius: borderRadious, height: height, backgroundColor: disabled ? "#1F2937" : "#3732FF", ...style}]}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  text: {
    fontWeight: "700",
    color: "white"
  }
})
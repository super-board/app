import React from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import style from "@/constants/style";

type KeyBoardViewProps = {
  children: React.ReactNode;
  avoid?: boolean; //KeyboardAvoid true | false
};

const KeyboardView = (props: KeyBoardViewProps) => {
  const {children, avoid = false} = props;
  return (
    <>
      {avoid ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={style.container}>{children}</View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={style.container}>{children}</View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default KeyboardView;

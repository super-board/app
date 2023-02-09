import React, {ReactNode} from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

type KeyBoardViewProps = {
  children: ReactNode | ReactNode[];
  avoid?: boolean; //KeyboardAvoid true | false
  style?: StyleProp<ViewStyle>;
};

export default function KeyboardView({avoid = false, style, children}: KeyBoardViewProps) {
  return (
    <>
      {avoid ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={style}>{children}</View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={style}>{children}</View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

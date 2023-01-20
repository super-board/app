import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {View} from "react-native";
import {Text} from "react-native-svg";

import style from "@/constants/style";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingTagSelectScreen({navigation}: Props) {
  return (
    <View style={style.container}>
      <Text>관심 태그 선택</Text>
    </View>
  );
}

export default OnboardingTagSelectScreen;

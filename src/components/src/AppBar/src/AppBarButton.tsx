import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Text, TouchableOpacity} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

type ButtonProps = {
  navigation?: NativeStackNavigationProp<ParamListBase>;
  onPress?: () => void;
};

function HistoryBack({navigation, onPress}: ButtonProps) {
  const onPressDefault = () => {
    navigation?.goBack();
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress ?? onPressDefault}>
      <SVG.Icon.ArrowBack width={20} height={20} />
    </TouchableOpacity>
  );
}

function Cancel({navigation, onPress}: ButtonProps) {
  const onPressDefault = () => {
    navigation?.popToTop();
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress ?? onPressDefault}>
      <Text style={[typography.subhead02, {color: colors.OTBBlack50}]}>취소</Text>
    </TouchableOpacity>
  );
}

function Search({navigation}: ButtonProps) {
  const onPress = () => {
    navigation?.push("SearchScreen");
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <SVG.Icon.Search width={24} height={24} />
    </TouchableOpacity>
  );
}

function Notifications({navigation}: ButtonProps) {
  const onPress = () => {
    navigation?.push("NotificationsScreen");
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <SVG.Icon.Notifications width={24} height={24} />
    </TouchableOpacity>
  );
}

export const AppBarButton = {
  HistoryBack,
  Cancel,
  Search,
  Notifications,
};

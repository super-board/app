import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Pressable, Text} from "react-native";

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
    <Pressable onPress={onPress ?? onPressDefault}>
      <SVG.Icon.ArrowBack width={20} height={20} />
    </Pressable>
  );
}

function Cancel({navigation, onPress}: ButtonProps) {
  const onPressDefault = () => {
    navigation?.popToTop();
  };

  return (
    <Pressable onPress={onPress ?? onPressDefault}>
      <Text style={[typography.subhead02, {color: colors.OTBBlack50}]}>취소</Text>
    </Pressable>
  );
}

function Search({navigation}: ButtonProps) {
  const onPress = () => {
    navigation?.push("SearchScreen");
  };

  return (
    <Pressable onPress={onPress}>
      <SVG.Icon.Search width={24} height={24} />
    </Pressable>
  );
}

function Notifications({navigation}: ButtonProps) {
  const onPress = () => {
    navigation?.push("NotificationsScreen");
  };

  return (
    <Pressable onPress={onPress}>
      <SVG.Icon.Notifications width={24} height={24} />
    </Pressable>
  );
}

function EditProfile({navigation}: ButtonProps) {
  const onPress = () => {
    navigation?.push("MyPageEditProfileScreen");
  };

  return (
    <Pressable onPress={onPress}>
      <SVG.Icon.EditProfile width={24} height={24} />
    </Pressable>
  );
}

export const AppBarButton = {
  HistoryBack,
  Cancel,
  Search,
  Notifications,
  EditProfile,
};

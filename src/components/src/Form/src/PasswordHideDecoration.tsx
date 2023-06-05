import React from "react";

import {StyleProp, ViewStyle} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import {SVG} from "@/assets/svgs";

type Props = {
  hide?: boolean;
  toggleHide?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function PasswordHideDecoration({hide = true, toggleHide = () => {}, style}: Props) {
  return (
    <TouchableOpacity style={style} activeOpacity={1} onPress={toggleHide}>
      {hide ? (
        <SVG.Icon.ViewTrue width={24} height={24} />
      ) : (
        <SVG.Icon.ViewFalse width={24} height={24} />
      )}
    </TouchableOpacity>
  );
}

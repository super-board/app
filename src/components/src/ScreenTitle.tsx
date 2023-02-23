import React from "react";

import {StyleProp, Text, View, ViewStyle} from "react-native";

import effects from "@/constants/effects";
import typography from "@/constants/typography";

import SizedBox from "./SizedBox";

type Props = {
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
};

export default function ScreenTitle({title, description, style}: Props) {
  return (
    <View style={style}>
      <Text style={[typography.display04, typography.textWhite, effects.textDropShadow]}>
        {title}
      </Text>
      {description ? (
        <>
          <SizedBox height={8} />
          <Text style={[typography.body01, typography.textBlack500, effects.textDropShadow]}>
            {description}
          </Text>
        </>
      ) : null}
    </View>
  );
}

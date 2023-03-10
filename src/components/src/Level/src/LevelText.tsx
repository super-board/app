import React, {useCallback} from "react";

import {Text} from "react-native";

import {Level} from "@/store";

type Props = Text["props"] & {
  level: Level;
};

export default function LevelText({level, ...otherProps}: Props) {
  const toKorean = useCallback(() => {
    switch (level) {
      case "JOKER":
        return "조커";
      case "SPADE":
        return "스페이드";
      case "DIAMOND":
        return "다이아몬드";
      case "HEART":
        return "하트";
      case "CLOVER":
        return "클로버";
      case "PLAYER":
        return "플레이어";
    }
  }, [level]);

  return <Text {...otherProps}>{toKorean()}</Text>;
}

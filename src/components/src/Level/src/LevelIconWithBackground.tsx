import React from "react";

import {StyleSheet, View} from "react-native";

import colors from "@/constants/colors";
import type {Level} from "@/types";

import LevelIcon from "./LevelIcon";

type Props = {
  level: Level;
  width?: number;
  height?: number;
};

export default function LevelIconWithBackground({level, width = 36, height = 36}: Props) {
  return (
    <View style={[styles.container, {width, height}]}>
      <LevelIcon
        level={level}
        width={width * 0.45}
        height={height * 0.45}
        color={colors.OTBBlack800}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.OTBBlueLight5,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
});

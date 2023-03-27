import React from "react";

import {Pressable, StyleSheet, View} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import colors from "@/constants/colors";

type Props = {
  isOn?: boolean;
  onToggle?: () => void;
  onColor?: string;
  offColor?: string;
};
export default function OTBSwitch({
  isOn = false,
  onToggle = () => {},
  onColor = colors.OTBBlue,
  offColor = colors.OTBBlack400,
}: Props) {
  const offset = useDerivedValue(() => withTiming(isOn ? 1 : 0, {duration: 200}));
  const animatedToggleContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(offset.value, [0, 1], [offColor, onColor]),
  }));
  const animatedToggleWheelStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value * 20}],
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={onToggle}>
        <Animated.View style={[styles.toggleContainer, animatedToggleContainerStyle]}>
          <Animated.View style={[styles.toggleWheel, animatedToggleWheelStyle]} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
  },
  toggleContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    padding: "5%",
  },
  toggleWheel: {
    width: "50%",
    height: "100%",
    borderRadius: 9999,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

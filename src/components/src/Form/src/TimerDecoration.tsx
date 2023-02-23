import React, {useEffect, useState} from "react";

import {StyleProp, StyleSheet, Text, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

type Props = {
  seconds?: number;
  style?: StyleProp<ViewStyle>;
};

export default function TimerDecoration({seconds = 180, style}: Props) {
  const [time, setTime] = useState(seconds * 1000);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (time > 0) timeout = setTimeout(() => setTime(time - 1000), 1000);

    return () => clearTimeout(timeout);
  }, [time]);

  return (
    <Text style={[typography.body02, styles.timer, style]}>
      {Math.floor(time / (60 * 1000))
        .toString()
        .padStart(2, "0")}
      :{(Math.floor(time % (60 * 1000)) / 1000).toString().padStart(2, "0")}
    </Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    color: colors.noticeRed,
    alignSelf: "center",
  },
});

import React from "react";

import {Pressable, StyleSheet, Text} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {DateTimeFormatter} from "@/services/formatter";

type Props = {
  isChecked?: boolean;
  message?: string;
  pushedAt?: string;
  onPress?: () => void;
};

function NotificationListItem({
  isChecked = false,
  message = "",
  pushedAt = new Date().toISOString(),
  onPress = () => {},
}: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text
        style={[
          typography.bodyLong02,
          styles.message,
          {color: isChecked ? colors.OTBBlack600 : colors.OTBBlack50},
        ]}
        ellipsizeMode="tail">
        {message}
      </Text>
      <Text
        style={[
          typography.bodyLong02,
          styles.relativeTime,
          {color: isChecked ? colors.OTBBlack600 : colors.OTBBlack50},
        ]}>
        {DateTimeFormatter.toRelativeTime(pushedAt)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: "row", gap: 8},
  message: {flex: 1},
  relativeTime: {width: 60, textAlign: "right"},
});

export default React.memo(NotificationListItem);

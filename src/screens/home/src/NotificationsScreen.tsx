import React from "react";

import {StyleSheet, Text, View} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {DateTimeFormatter} from "@/services/formatter";
import {useGetRecentNotificationsQuery} from "@/store";

export default function NotificationsScreen() {
  const {isLoading, data: notifications} = useGetRecentNotificationsQuery();

  if (isLoading || !notifications) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <View key={notification.id}>
          <View style={styles.row}>
            <Text
              style={[
                typography.bodyLong02,
                styles.message,
                {color: notification.isSeen ? colors.OTBBlack600 : colors.OTBBlack50},
              ]}
              ellipsizeMode="tail">
              {notification.message}
            </Text>
            <Text
              style={[
                typography.bodyLong02,
                styles.relativeTime,
                {color: notification.isSeen ? colors.OTBBlack600 : colors.OTBBlack50},
              ]}>
              {DateTimeFormatter.toRelativeTime(notification.createdAt)}
            </Text>
          </View>
          {index !== notifications.length - 1 ? <View style={styles.horizontalDivider} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 24, backgroundColor: colors.OTBBlack},
  row: {flexDirection: "row", gap: 8},
  message: {flex: 1},
  relativeTime: {width: 60, textAlign: "right"},
  horizontalDivider: {
    marginVertical: 16,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.OTBBlack700,
  },
});

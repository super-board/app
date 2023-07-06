import React from "react";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StyleSheet, Text, View} from "react-native";

import {api} from "@/api";
import {OTBSwitch, SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useRefetchQuery} from "@/hooks";

export default function NotificationSettingsScreen() {
  const queryClient = useQueryClient();
  const {data: settings} = useRefetchQuery(
    ["settings/notification"],
    api.pushToggle.fetchPushSettings,
  );
  const {mutate: updatePushSettings} = useMutation(api.pushToggle.updatePushSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["settings/notification"]);
    },
  });
  const isAllOn = React.useMemo(
    () => settings?.commentYn === "Y" && settings?.favoriteTagYn === "Y",
    [settings],
  );

  const onToggle = {
    all: () => {
      const toBe = !isAllOn;
      updatePushSettings({commentYn: toBe ? "Y" : "N", favoriteTagYn: toBe ? "Y" : "N"});
    },
    comment: () => {
      if (settings)
        updatePushSettings({
          commentYn: settings.commentYn === "Y" ? "N" : "Y",
          favoriteTagYn: settings.favoriteTagYn,
        });
    },
    tag: () => {
      if (settings)
        updatePushSettings({
          commentYn: settings.commentYn,
          favoriteTagYn: settings.favoriteTagYn === "Y" ? "N" : "Y",
        });
    },
  };

  return (
    <View style={style.screenWithAppBarContainer}>
      <SizedBox height={16} />
      <View style={styles.row}>
        <Text style={[typography.subhead01, styles.flex, {color: colors.OTBBlack100}]}>전체</Text>
        <OTBSwitch isOn={isAllOn} onToggle={onToggle.all} />
      </View>
      <SizedBox height={32} />
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[typography.body02, {color: colors.OTBBlack100}]}>내 리뷰 댓글 알림</Text>
          <SizedBox height={8} />
          <Text style={[typography.caption, {color: colors.OTBBlack500}]}>
            내가 작성한 리뷰에 댓글이 달렸을 때 알림을 받을 수 있어요.
          </Text>
        </View>
        <OTBSwitch isOn={settings?.commentYn === "Y"} onToggle={onToggle.comment} />
      </View>
      <SizedBox height={16} />
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={[typography.body02, {color: colors.OTBBlack100}]}>태그 알림</Text>
          <SizedBox height={8} />
          <Text style={[typography.caption, {color: colors.OTBBlack500}]}>
            내가 선택한 관심 태그에 해당되는 게임이 새롭게 등록되었을 때 알림을 받을 수 있어요.
          </Text>
        </View>
        <OTBSwitch isOn={settings?.favoriteTagYn === "Y"} onToggle={onToggle.tag} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  flex: {
    flex: 1,
  },
});

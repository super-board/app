import React, {useEffect, useState} from "react";

import {StyleSheet, Text, View} from "react-native";

import {OTBSwitch, SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";

export default function NotificationSettingsScreen() {
  const [isAllOn, setIsAllOn] = useState(true);
  const [isCommentOn, setIsCommentOn] = useState(true);
  const [isTagOn, setIsTagOn] = useState(true);

  const onToggle = {
    all: () => {
      const toBe = !isAllOn;
      setIsAllOn(toBe);
      setIsCommentOn(toBe);
      setIsTagOn(toBe);
    },
    comment: () => setIsCommentOn(state => !state),
    tag: () => setIsTagOn(state => !state),
  };

  useEffect(() => {
    setIsAllOn(isCommentOn && isTagOn);
  }, [isCommentOn, isTagOn]);

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
        <OTBSwitch isOn={isCommentOn} onToggle={onToggle.comment} />
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
        <OTBSwitch isOn={isTagOn} onToggle={onToggle.tag} />
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

import React from "react";

import {StyleSheet, Text, View} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";

export default function Manager({navigation}: ScreenProps) {
  function Menu(props: {text: string; onPress: () => void}) {
    const {text, onPress} = props;
    return (
      <TouchableWithoutFeedback style={styles.menu} onPress={() => onPress()}>
        <Text style={[typography.body01, styles.text]}>{text}</Text>
      </TouchableWithoutFeedback>
    );
  }

  const onPress = {
    notice: () => navigation.navigate("ManageNoticeScreen"),
    inquiry: () => navigation.navigate("ManageInquiryScreen"),
    review: () => navigation.navigate("ManageTabScreen"),
    commnet: () => navigation.navigate("ManageTabScreen"),
    report: () => navigation.navigate("ManageTabScreen"),
  };

  return (
    <View style={style.screenWithAppBarContainer}>
      <Menu text="공지사항" onPress={onPress.notice} />
      <View style={styles.divider} />
      <Menu text="1:1 문의" onPress={onPress.inquiry} />
      <View style={styles.divider} />
      <Menu text="리뷰 관리" onPress={onPress.review} />
      <View style={styles.divider} />
      <Menu text="댓글 관리" onPress={onPress.commnet} />
      <View style={styles.divider} />
      <Menu text="신고게시물 관리" onPress={onPress.report} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    paddingVertical: 16,
  },
  text: {
    color: colors.OTBBlack50,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.OTBBlack700,
  },
});

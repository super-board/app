import React, {memo, useState} from "react";

import {Pressable, StyleSheet, Text, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";
import {DateTimeFormatter} from "@/services/formatter";
import {Notice} from "@/store";

type Props = {
  notice: Notice;
};

function NoticeListItem({notice}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const togggleExpand = () => setIsExpanded(state => !state);

  return (
    <View>
      <Pressable style={styles.titleContainer} onPress={togggleExpand}>
        <View style={{flex: 1}}>
          <Text
            style={[typography.body01, effects.textDropShadow, {color: colors.OTBBlack50}]}
            ellipsizeMode="tail">
            {notice.title}
          </Text>
          <SizedBox height={4} />
          <Text style={[typography.caption, {color: colors.OTBBlack400}]}>
            {DateTimeFormatter.toJoinedDate(notice.createdAt, ".")}
          </Text>
        </View>
        {isExpanded ? (
          <SVG.Icon.Collapse width={20} height={20} />
        ) : (
          <SVG.Icon.ExpandMore width={20} height={20} />
        )}
      </Pressable>
      {isExpanded ? (
        <View style={styles.contentContainer}>
          <Text style={[typography.body02, {color: colors.OTBBlack200}]}>{notice.content}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderBottomColor: colors.OTBBlack700,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    padding: 24,
    backgroundColor: colors.OTBBlack800,
  },
});

export default memo(NoticeListItem);
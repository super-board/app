import React from "react";

import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";

import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useLoginInfo} from "@/hooks";
import {BadgeType} from "@/types";

import {BadgeListItem} from "../components";

export default function BadgeScreen() {
  const {isLoading, loginInfo} = useLoginInfo();

  const isBadgeAchieved = (type: BadgeType) => loginInfo?.badges.includes(type);

  if (isLoading || !loginInfo) return <View style={style.screenWithAppBarContainer} />;

  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <SizedBox height={16} />
      <View style={styles.headerContainer}>
        <Text style={[typography.headline, {color: colors.OTBBlack100}]}>
          {loginInfo.nickname}님이{"\n"}현재 획득하신 뱃지
        </Text>
        <Text style={[typography.headline, {color: colors.OTBBlueLight4}]}>
          {loginInfo.badges.length}/10개
        </Text>
      </View>
      <SizedBox height={36} />

      <View style={styles.badgeContainer}>
        <BadgeListItem type={"JOIN"} isAchieved={isBadgeAchieved("JOIN")} />
        <BadgeListItem
          type={"POST_FIRST_REVIEW"}
          isAchieved={isBadgeAchieved("POST_FIRST_REVIEW")}
        />
        <BadgeListItem
          type={"POST_FIVE_REVIEWS"}
          isAchieved={isBadgeAchieved("POST_FIVE_REVIEWS")}
        />
      </View>
      <SizedBox height={24} />
      <View style={styles.badgeContainer}>
        <BadgeListItem
          type={"ATTEND_SEVEN_DAYS"}
          isAchieved={isBadgeAchieved("ATTEND_SEVEN_DAYS")}
        />
        <BadgeListItem
          type={"ATTEND_THIRTY_DAYS"}
          isAchieved={isBadgeAchieved("ATTEND_THIRTY_DAYS")}
        />
        <BadgeListItem
          type={"SET_PROFILE_CHARACTER"}
          isAchieved={isBadgeAchieved("SET_PROFILE_CHARACTER")}
        />
      </View>
      <SizedBox height={24} />
      <View style={styles.badgeContainer}>
        <BadgeListItem
          type={"SET_PUSH_ALARM_ON"}
          isAchieved={isBadgeAchieved("SET_PUSH_ALARM_ON")}
        />
        <BadgeListItem
          type={"POST_FIVE_COMMENTS"}
          isAchieved={isBadgeAchieved("POST_FIVE_COMMENTS")}
        />
        <BadgeListItem
          type={"SELECTED_RECOMMENDED_REVIEW"}
          isAchieved={isBadgeAchieved("SELECTED_RECOMMENDED_REVIEW")}
        />
      </View>
      <SizedBox height={24} />
      <View style={styles.badgeContainer}>
        <BadgeListItem
          type={"GAIN_TEN_REVIEW_LIKES"}
          isAchieved={isBadgeAchieved("GAIN_TEN_REVIEW_LIKES")}
        />
      </View>
      <SizedBox height={24} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  badgeContainer: {
    height: ((Dimensions.get("screen").width - 60) / 3) * 1.6,
    flexDirection: "row",
    gap: 6,
  },
});

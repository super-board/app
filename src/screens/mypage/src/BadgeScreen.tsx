import React from "react";

import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";

import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {BadgeType, useGetMyBadgesQuery, useGetMyPageDetailsQuery} from "@/store";

import {BadgeListItem} from "../components";

export default function BadgeScreen({navigation}: ScreenProps) {
  const {isLoading: isMyPageDetailsLoading, data: myPageDetails} = useGetMyPageDetailsQuery();
  const {isLoading: isMyBadgesLoading, data: myBadges} = useGetMyBadgesQuery();

  const isBadgeAchieved = (type: BadgeType) =>
    myBadges?.find(badge => badge.type === type) !== undefined;

  if (isMyPageDetailsLoading || isMyBadgesLoading || !myPageDetails || !myBadges)
    return <View style={style.screenWithAppBarContainer} />;

  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <SizedBox height={16} />
      <View style={styles.headerContainer}>
        <Text style={[typography.headline, {color: colors.OTBBlack100}]}>
          {myPageDetails.nickname}님이{"\n"}현재 획득하신 뱃지
        </Text>
        <Text style={[typography.headline, {color: colors.OTBBlueLight4}]}>
          {myBadges.length}/10개
        </Text>
      </View>
      <SizedBox height={36} />

      <View style={styles.badgeContainer}>
        <BadgeListItem type={1} isAchieved={isBadgeAchieved(1)} />
        <BadgeListItem type={2} isAchieved={isBadgeAchieved(2)} />
        <BadgeListItem type={3} isAchieved={isBadgeAchieved(3)} />
      </View>
      <SizedBox height={24} />
      <View style={styles.badgeContainer}>
        <BadgeListItem type={4} isAchieved={isBadgeAchieved(4)} />
        <BadgeListItem type={5} isAchieved={isBadgeAchieved(5)} />
        <BadgeListItem type={6} isAchieved={isBadgeAchieved(6)} />
      </View>
      <SizedBox height={24} />
      <View style={styles.badgeContainer}>
        <BadgeListItem type={7} isAchieved={isBadgeAchieved(7)} />
        <BadgeListItem type={8} isAchieved={isBadgeAchieved(8)} />
        <BadgeListItem type={9} isAchieved={isBadgeAchieved(9)} />
      </View>
      <SizedBox height={24} />
      <View style={styles.badgeContainer}>
        <BadgeListItem type={10} isAchieved={isBadgeAchieved(10)} />
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

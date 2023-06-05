import React, {useMemo} from "react";

import {Text, View} from "react-native";

import {SVG} from "@/assets/svgs";
import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {BadgeType} from "@/types";

type Props = {
  type: BadgeType;
  isAchieved?: boolean;
};

export default function BadgeImageWrapper({type, isAchieved = false}: Props) {
  const text = useMemo(
    () => ({
      JOIN: "처음이에요",
      POST_FIRST_REVIEW: "시작이 반이다",
      POST_FIVE_REVIEWS: "온더보드 홀릭",
      ATTEND_SEVEN_DAYS: "프로출석러",
      ATTEND_THIRTY_DAYS: "고인물",
      SET_PROFILE_CHARACTER: "오늘부터 1일",
      SET_PUSH_ALARM_ON: "놓치지않을거에요",
      POST_FIVE_COMMENTS: "무플방지위원회",
      SELECTED_RECOMMENDED_REVIEW: "보드게임전도사",
      GAIN_TEN_REVIEW_LIKES: "취향전도사",
    }),
    [],
  );

  return (
    <View style={{aspectRatio: 10 / 16, alignItems: "center"}}>
      <View style={{width: "100%", height: "83.75%"}}>
        <BadgeImage type={type} isAchieved={isAchieved} />
      </View>
      <SizedBox height={8} />
      <Text
        style={[
          typography.subhead03,
          {color: isAchieved ? colors.OTBBlack200 : colors.OTBBlack400},
        ]}>
        {text[type]}
      </Text>
    </View>
  );
}

function BadgeImage({type, isAchieved = false}: Props) {
  switch (type) {
    case "JOIN":
      return isAchieved ? (
        <SVG.Badge.FirstRegisterOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FirstRegisterOff width="100%" height="100%" />
      );
    case "POST_FIRST_REVIEW":
      return isAchieved ? (
        <SVG.Badge.FirstReviewOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FirstReviewOff width="100%" height="100%" />
      );
    case "POST_FIVE_REVIEWS":
      return isAchieved ? (
        <SVG.Badge.FiveReviewsOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FiveReviewsOff width="100%" height="100%" />
      );
    case "ATTEND_SEVEN_DAYS":
      return isAchieved ? (
        <SVG.Badge.AttendanceSevenDaysOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.AttendanceSevenDaysOff width="100%" height="100%" />
      );
    case "ATTEND_THIRTY_DAYS":
      return isAchieved ? (
        <SVG.Badge.AttendanceThirtyDaysOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.AttendanceThirtyDaysOff width="100%" height="100%" />
      );
    case "SET_PROFILE_CHARACTER":
      return isAchieved ? (
        <SVG.Badge.ProfileCharacterUpdateOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.ProfileCharacterUpdateOff width="100%" height="100%" />
      );
    case "SET_PUSH_ALARM_ON":
      return isAchieved ? (
        <SVG.Badge.NotificationSettingOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.NotificationSettingOff width="100%" height="100%" />
      );
    case "POST_FIVE_COMMENTS":
      return isAchieved ? (
        <SVG.Badge.FiveCommentsOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FiveCommentsOff width="100%" height="100%" />
      );
    case "SELECTED_RECOMMENDED_REVIEW":
      return isAchieved ? (
        <SVG.Badge.BestReviewOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.BestReviewOff width="100%" height="100%" />
      );
    case "GAIN_TEN_REVIEW_LIKES":
      return isAchieved ? (
        <SVG.Badge.ReviewTenLikesOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.ReviewTenLikesOff width="100%" height="100%" />
      );
  }

  return <></>;
}

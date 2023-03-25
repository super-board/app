import React, {useMemo} from "react";

import {Text, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {BadgeType} from "@/store";

type Props = {
  type: BadgeType;
  isAchieved?: boolean;
};

export default function BadgeImageWrapper({type, isAchieved = false}: Props) {
  const text = useMemo(
    () => [
      "처음이에요",
      "시작이 반이다",
      "온더보드 홀릭",
      "프로출석러",
      "고인물",
      "오늘부터 1일",
      "놓치지않을거에요",
      "무플방지위원회",
      "보드게임전도사",
      "취향전도사",
    ],
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
        x{text[type]}
      </Text>
    </View>
  );
}

function BadgeImage({type, isAchieved = false}: Props) {
  switch (type) {
    case 1:
      return isAchieved ? (
        <SVG.Badge.FirstRegisterOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FirstRegisterOff width="100%" height="100%" />
      );
    case 2:
      return isAchieved ? (
        <SVG.Badge.FirstReviewOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FirstReviewOff width="100%" height="100%" />
      );
    case 3:
      return isAchieved ? (
        <SVG.Badge.FiveReviewsOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FiveReviewsOff width="100%" height="100%" />
      );
    case 4:
      return isAchieved ? (
        <SVG.Badge.AttendanceSevenDaysOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.AttendanceSevenDaysOff width="100%" height="100%" />
      );
    case 5:
      return isAchieved ? (
        <SVG.Badge.AttendanceThirtyDaysOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.AttendanceThirtyDaysOff width="100%" height="100%" />
      );
    case 6:
      return isAchieved ? (
        <SVG.Badge.ProfileCharacterUpdateOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.ProfileCharacterUpdateOff width="100%" height="100%" />
      );
    case 7:
      return isAchieved ? (
        <SVG.Badge.NotificationSettingOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.NotificationSettingOff width="100%" height="100%" />
      );
    case 8:
      return isAchieved ? (
        <SVG.Badge.FiveCommentsOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.FiveCommentsOff width="100%" height="100%" />
      );
    case 9:
      return isAchieved ? (
        <SVG.Badge.BestReviewOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.BestReviewOff width="100%" height="100%" />
      );
    case 10:
      return isAchieved ? (
        <SVG.Badge.ReviewTenLikesOn width="100%" height="100%" />
      ) : (
        <SVG.Badge.ReviewTenLikesOff width="100%" height="100%" />
      );
  }

  return <></>;
}

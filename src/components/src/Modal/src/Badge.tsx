import React from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Modal as DefModal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {SVG} from "@/assets/svgs";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";
import {useLoginInfo} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";

import OTBButton from "../../OTBButton";
import SizedBox from "../../SizedBox";
import type {BadgeModalProps} from "./types";

export default function Badge({
  visible,
  type,
  onRequestClose,
  onNavigateToMyBadges,
  ...otherProps
}: BadgeModalProps) {
  const {loginInfo} = useLoginInfo();
  const badges = React.useMemo(
    () => ({
      JOIN: {
        svg: <SVG.Badge.FirstRegisterOn style={styles.badgeSVG} width="100%" height="100%" />,
        title: "처음이에요 뱃지 획득!",
        message: `${loginInfo?.nickname}님의 온더보드 참여를 환영합니다! 앞으로도 온더보드에서 더 자주 만나요!`,
      },
      POST_FIRST_REVIEW: {
        svg: <SVG.Badge.FirstReviewOn width="100%" height="100%" />,
        title: "시작이 반이다 뱃지 획득!",
        message: `${loginInfo?.nickname}님의 리뷰는 온더보드를 이용하는 플레이어들에게 많은 도움이 됩니다! 앞으로 잘부탁드려요!`,
      },
      POST_FIVE_REVIEWS: {
        svg: <SVG.Badge.FiveReviewsOn width="100%" height="100%" />,
        title: "온더보드 홀릭 뱃지 획득!",
        message: `벌써 5개의 리뷰를 작성하셨군요! ${loginInfo?.nickname}님을 진정한 온더보드 매니아로 인정합니다!`,
      },
      ATTEND_SEVEN_DAYS: {
        svg: <SVG.Badge.AttendanceSevenDaysOn width="100%" height="100%" />,
        title: "프로출석러 뱃지 획득!",
        message: "일주일 매일매일 출석한 당신! 온더보드의 단골손님이 되셨군요♡",
      },
      ATTEND_THIRTY_DAYS: {
        svg: <SVG.Badge.AttendanceThirtyDaysOn width="100%" height="100%" />,
        title: "고인물 뱃지 획득!",
        message: `매일 빠짐없이 30일간 출석하셨네요! ${loginInfo?.nickname}님의 열정에 박수를 드립니다~ 내일도 기다릴게요!`,
      },
      SET_PROFILE_CHARACTER: {
        svg: <SVG.Badge.ProfileCharacterUpdateOn width="100%" height="100%" />,
        title: "오늘부터 1일 뱃지 획득!",
        message: `이제 조금씩 ${loginInfo?.nickname}님에 대해 알아가겠어요! 관심 태그도 변경하면 다른 게임들도 엿볼수 있답니다~`,
      },
      SET_PUSH_ALARM_ON: {
        svg: <SVG.Badge.NotificationSettingOn width="100%" height="100%" />,
        title: "놓치지 않을거에요 뱃지 획득!",
        message: `${loginInfo?.nickname}님에 대한 관심, 놓치지 않을거에요!`,
      },
      POST_FIVE_COMMENTS: {
        svg: <SVG.Badge.FiveCommentsOn width="100%" height="100%" />,
        title: "무플방지위원회 뱃지 획득!",
        message: `${loginInfo?.nickname}님의 따뜻한 관심x5으로 온더보드가 조금더 따뜻해졌습니다~;`,
      },
      SELECTED_RECOMMENDED_REVIEW: {
        svg: <SVG.Badge.BestReviewOn width="100%" height="100%" />,
        title: "보드게임전도사 뱃지 획득!",
        message: `${loginInfo?.nickname}님이 작성하신 리뷰가 많은 온더보드 플레이어들에게 도움이 된 글로 선정되었어요! 정말 대단해요!`,
      },
      GAIN_TEN_REVIEW_LIKES: {
        svg: <SVG.Badge.ReviewTenLikesOn width="100%" height="100%" />,
        title: "취향전도사 뱃지 획득!",
        message: `좋아하는 것을 표현할 줄 아는 당신! ${loginInfo?.nickname}님의 취향을 존중합니다!`,
      },
    }),
    [loginInfo],
  );
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      {...otherProps}>
      <View style={styles.screenContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.backdrop} />
        <View style={[styles.modalContainer, styles.badgeContainer]}>
          <View style={styles.close}>
            <Pressable onPress={onRequestClose}>
              <SVG.Icon.Close width={30} height={30} />
            </Pressable>
          </View>
          <View style={[styles.badge, styles.badgeSVG]}>{badges[type].svg}</View>
          <SizedBox height={16} />
          <Text
            style={[
              typography.subhead01,
              typography.textWhite,
              typography.textCenter,
              effects.textDropShadow,
              {paddingHorizontal: 10},
            ]}>
            {badges[type].title}
          </Text>
          <SizedBox height={8} />
          <Text
            style={[
              typography.body02,
              typography.textWhite,
              typography.textCenter,
              effects.textDropShadow,
              {paddingHorizontal: 10},
            ]}>
            {badges[type].message}
          </Text>
          <SizedBox height={20} />
        </View>

        <OTBButton
          type="modal-primary"
          text="내 뱃지 보러가기"
          onPress={onNavigateToMyBadges}
          style={{marginTop: 8, width: "70%"}}
        />
      </View>
    </DefModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalContainer: {
    backgroundColor: colors.OTBBlack800,
    alignItems: "center",
    width: "70%",
    borderRadius: 8,
    padding: 8,
  },
  badgeContainer: {
    borderRadius: 8,
    height: "50%",
  },
  close: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 8,
    marginTop: 8,
  },
  badge: {
    flex: 1,
    width: "100%",
  },
  badgeSVG: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 10,
  },
});

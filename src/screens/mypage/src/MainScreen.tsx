import React, {useCallback, useMemo} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {
  LevelIconWithBackground,
  LevelText,
  Modal,
  ProfileImage,
  SelectedTagsHorizontalListView,
  SizedBox,
} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useLogin} from "@/hooks/common";
import {useModal} from "@/hooks/modal";
import {useGetMyPageDetailsQuery} from "@/store";

import {FavoriteBoardGamesPreview, MainScreenSkeleton, MyReviewsPreview} from "../components";

export default function MainScreen({navigation}: ScreenProps) {
  const {didLogin} = useLogin();
  const {isLoading, data: myPageDetails} = useGetMyPageDetailsQuery();
  const {
    visible: isSignUpModalVisible,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal();
  const {
    visible: isLevelInfoModalVisible,
    openModal: openLevelInfoModal,
    closeModal: closeLevelInfoModal,
  } = useModal();
  const {
    visible: isResetTagsModalVisible,
    openModal: openResetTagsModal,
    closeModal: closeResetTagsModal,
  } = useModal();

  const onPress = useMemo(
    () => ({
      moreBadges: () => {
        navigation.navigate("MyPageBadgeScreen");
      },
      resetTags: openResetTagsModal,
      moreMyReviews: () => {
        navigation.navigate("MyPageMyReviewsScreen");
      },
      moreFavoriteBoardGames: () => {
        navigation.navigate("MyPageFavoriteBoardGamesScreen");
      },
      toNotice: () => {
        navigation.navigate("MyPageNoticeScreen");
      },
      toInquiry: () => {
        navigation.navigate("MyPageInquiryScreen");
      },
      toSettings: () => {
        navigation.navigate("MyPageSettingsScreen");
      },
    }),
    [],
  );

  const onSignUp = () => {
    navigation.navigate("RegisterEmailVerificationScreen");
  };

  useFocusEffect(
    useCallback(() => {
      if (!didLogin) openSignUpModal();
    }, []),
  );

  // if (!didLogin || isLoading || !myPageDetails)
  if (isLoading || !myPageDetails)
    return (
      <>
        <MainScreenSkeleton />
        <Modal.Dialog
          visible={isSignUpModalVisible}
          IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
          title={"회원가입으로 좋아하는\n보드게임을 모아보세요!"}
          confirmText="회원가입"
          onConfirm={onSignUp}
          onRequestClose={closeSignUpModal}
        />
      </>
    );

  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <SizedBox height={20} />
      <View style={styles.profileContainer}>
        <ProfileImage type={myPageDetails.profileCharacter} width={96} height={96} />
        <Text style={[typography.headline, typography.textWhite]}>{myPageDetails.nickname}</Text>
      </View>
      <SizedBox height={8} />

      <View style={styles.levelContainer}>
        <LevelIconWithBackground level={myPageDetails.level} />
        <SizedBox width={7} />
        <View style={{flex: 1}}>
          <LevelText
            style={[typography.subhead02, typography.textWhite]}
            level={myPageDetails.level}
          />
          <Text style={[typography.caption, typography.textWhite]}>
            {myPageDetails.point}포인트
          </Text>
        </View>
        <Pressable style={styles.aboutLevelsButton} onPress={openLevelInfoModal}>
          <Text style={[typography.subhead03, {color: colors.OTBBlack400}]}>등급 알아보기</Text>
        </Pressable>
        <SizedBox width={6} />
      </View>

      <SizedBox height={24} />
      <View style={styles.sectionRow}>
        <View style={{flexDirection: "row", gap: 8}}>
          <Text style={[typography.subhead01, {color: colors.OTBBlack100}]}>내 뱃지</Text>
          <Text style={[typography.subhead02, {color: colors.OTBBlueLight4}]}>
            {myPageDetails.badgeCounts}/10개
          </Text>
        </View>
        <Pressable style={styles.link} onPress={onPress.moreBadges}>
          <Text style={[typography.caption, styles.linkText]}>더보기</Text>
        </Pressable>
      </View>
      <SizedBox height={24} />

      <View style={styles.sectionRow}>
        <Text style={[typography.subhead01, {color: colors.OTBBlack100}]}>내 관심태그</Text>
        <Pressable style={styles.link} onPress={onPress.resetTags}>
          <Text style={[typography.caption, styles.linkText]}>태그 재설정</Text>
        </Pressable>
      </View>
      <SizedBox height={8} />
      <SelectedTagsHorizontalListView insetPadding={0} chipType="myPage" />
      <SizedBox height={16} />

      <View style={styles.sectionRow}>
        <View style={{flexDirection: "row", gap: 8}}>
          <Text style={[typography.subhead01, {color: colors.OTBBlack100}]}>내 리뷰</Text>
        </View>
        {myPageDetails.myReviews.length > 3 ? (
          <Pressable style={styles.link} onPress={onPress.moreMyReviews}>
            <Text style={[typography.caption, styles.linkText]}>더보기</Text>
          </Pressable>
        ) : null}
      </View>
      <SizedBox height={16} />
      <MyReviewsPreview reviews={myPageDetails.myReviews} />
      <SizedBox height={24} />

      <View style={styles.sectionRow}>
        <View style={{flexDirection: "row", gap: 8}}>
          <Text style={[typography.subhead01, {color: colors.OTBBlack100}]}>
            보드게임 좋아요 목록
          </Text>
        </View>
        {myPageDetails.favoriteBoardGames.length > 3 ? (
          <Pressable style={styles.link} onPress={onPress.moreFavoriteBoardGames}>
            <Text style={[typography.caption, styles.linkText]}>더보기</Text>
          </Pressable>
        ) : null}
      </View>
      <SizedBox height={16} />
      <FavoriteBoardGamesPreview boardGames={myPageDetails.favoriteBoardGames} />
      <SizedBox height={24} />

      <View style={styles.sectionRow}>
        <View style={{flexDirection: "row", gap: 8}}>
          <Text style={[typography.subhead01, {color: colors.OTBBlack100}]}>내 관리 목록</Text>
        </View>
      </View>
      <SizedBox height={16} />
      <View style={styles.listContainer}>
        <Pressable style={styles.listItem} onPress={onPress.toNotice}>
          <Text style={[typography.subhead02, styles.listItemText]}>공지사항</Text>
          <SVG.Icon.ArrowBack style={styles.listItemIcon} width={20} height={20} />
        </Pressable>
        <Pressable style={styles.listItem} onPress={onPress.toInquiry}>
          <Text style={[typography.subhead02, styles.listItemText]}>1:1문의</Text>
          <SVG.Icon.ArrowBack style={styles.listItemIcon} width={20} height={20} />
        </Pressable>
        <Pressable style={styles.listItem} onPress={onPress.toSettings}>
          <Text style={[typography.subhead02, styles.listItemText]}>설정</Text>
          <SVG.Icon.ArrowBack style={styles.listItemIcon} width={20} height={20} />
        </Pressable>
      </View>
      <SizedBox height={24} />

      <Modal.LevelInfo visible={isLevelInfoModalVisible} onRequestClose={closeLevelInfoModal} />
      <Modal.ResetTags visible={isResetTagsModalVisible} onRequestClose={closeResetTagsModal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {width: "100%", alignItems: "center", gap: 8},
  levelContainer: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.OTBBlack800,
    flexDirection: "row",
    alignItems: "center",
  },
  aboutLevelsButton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderColor: colors.OTBBlack400,
    borderWidth: 1,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    borderBottomWidth: 1,
    borderBottomColor: colors.OTBBlack300,
  },
  linkText: {
    color: colors.OTBBlack300,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.OTBBlack800,
    borderRadius: 8,
  },
  listItem: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  listItemText: {color: colors.OTBBlack300, flex: 1},
  listItemIcon: {transform: [{rotate: "180deg"}], color: colors.OTBBlack300},
});
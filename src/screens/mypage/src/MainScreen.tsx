import React, {useCallback} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import * as SVG from "@/assets/svgs";
import {
  LevelIconWithBackground,
  LevelText,
  Modal,
  OTBButton,
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

import {MainScreenSkeleton} from "../components";

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
    closeModal,
    closeModal: closeLevelInfoModal,
  } = useModal();
  const {
    visible: isResetTagsModalVisible,
    openModal: openResetTagsModal,
    closeModal: closeResetTagsModal,
  } = useModal();

  const onSignUp = () => {
    navigation.navigate("RegisterEmailVerificationScreen");
  };

  useFocusEffect(
    useCallback(() => {
      if (!didLogin) openSignUpModal();
    }, []),
  );

  if (!didLogin || isLoading || !myPageDetails) return <MainScreenSkeleton />;

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
      <SizedBox height={16} />

      <View style={styles.sectionRow}>
        <Text style={[typography.subhead01, {color: colors.OTBBlack100}]}>내 관심태그</Text>
        <Pressable style={styles.link} onPress={openResetTagsModal}>
          <Text style={[typography.caption, styles.linkText]}>태그 재설정</Text>
        </Pressable>
      </View>
      <SizedBox height={8} />
      <SelectedTagsHorizontalListView insetPadding={0} chipType="myPage" />
      <SizedBox height={16} />

      <Modal.Dialog
        visible={isSignUpModalVisible}
        IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
        title={"더 많은 보드게임 정보가\n궁금하신가요?"}
        description={"회원가입하고 재미있는\n보드게임 정보를 확인하세요!"}
        confirmText="회원가입"
        onConfirm={onSignUp}
        onRequestClose={closeSignUpModal}
      />
      <OTBButton
        type="basic-primary"
        text="관리자"
        onPress={() => navigation.navigate("ManagerScreen")}
      />
      <OTBButton
        type="basic-primary"
        text="회원관리"
        onPress={() => navigation.navigate("ManageUserScreen")}
      />
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
});

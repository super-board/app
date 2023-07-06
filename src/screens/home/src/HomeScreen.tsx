import React from "react";

import {useFocusEffect} from "@react-navigation/native";
import {useQueryClient} from "@tanstack/react-query";
import {ScrollView, StyleSheet, Text, View} from "react-native";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {BestReviews, CurationCarousel, Modal, SizedBox} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import typography from "@/constants/typography";
import {useModal, useRefetchQuery} from "@/hooks";
import {BadgeType} from "@/types";
import {useAuthStore} from "@/zustand-stores";

export default function HomeScreen({navigation, route}: ScreenProps) {
  const {
    visible: welcomeModalVisible,
    openModal: openWelcomeModal,
    closeModal: closeWelcomeModal,
  } = useModal();
  const {
    visible: badgeModalVisible,
    openModal: openBadgeModal,
    closeModal: closeBadgeModal,
  } = useModal();
  const didLogin = useAuthStore(state => !!state.accessToken);
  const queryClient = useQueryClient();
  const {data} = useRefetchQuery(["members/mypage/badges"], api.member.fetchBadges, {
    enabled: didLogin,
  });
  const [badgeModalQueue, setBadgeModalQueue] = React.useState<BadgeType[]>([]);

  const onCloseBadgeModal = () => {
    closeBadgeModal();
    setBadgeModalQueue(badgeModalQueue.slice(1));
  };

  const onNavigateToMyBadges = () => {
    queryClient.invalidateQueries(["members/mypage/badges"]);
    closeBadgeModal();
    setBadgeModalQueue([]);
    navigation.navigate("MyPageBadgeScreen");
  };

  React.useEffect(() => {
    if (badgeModalQueue.length) openBadgeModal();
  }, [badgeModalQueue]);

  useFocusEffect(
    React.useCallback(() => {
      const shouldWelcome = (route.params as {shouldWelcome?: boolean})?.shouldWelcome ?? false;
      if (shouldWelcome) {
        openWelcomeModal();
        navigation.setParams({shouldWelcome: false});
      }

      if (data && data.newBadges.length) setBadgeModalQueue(data.newBadges);
    }, [route.params, data?.newBadges]),
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <SizedBox height={16} />
        <View style={styles.screenPadding}>
          <Text style={[typography.headline, typography.textWhite]}>추천게임</Text>
          <Text style={[typography.bodyLong02, styles.description]}>
            요즘은 이런 게임을 많이 하더라구요 🤗
          </Text>
        </View>

        <SizedBox height={24} />
        <CurationCarousel />
        <SizedBox height={48} />

        <View style={styles.screenPadding}>
          <Text style={[typography.headline, typography.textWhite]}>이번주 BEST 리뷰</Text>
          <Text style={[typography.bodyLong02, styles.description]}>
            누가누가 보드게임 전도사?! 🤔
          </Text>

          <SizedBox height={24} />
          <BestReviews />
          <SizedBox height={12} />
        </View>
      </ScrollView>
      <Modal.Alert
        visible={welcomeModalVisible}
        IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
        title="환영합니다!"
        description="온더보드에서 보드게임에 푹 빠질 준비 되셨나요?"
        onRequestClose={closeWelcomeModal}
      />
      <Modal.Badge
        visible={badgeModalVisible}
        type={badgeModalQueue[0] ?? "JOIN"}
        onRequestClose={onCloseBadgeModal}
        onNavigateToMyBadges={onNavigateToMyBadges}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  screenPadding: {paddingHorizontal: 24},
  description: {
    color: colors.OTBBlack400,
  },
});

import React from "react";

import {useFocusEffect} from "@react-navigation/native";
import {ScrollView, StyleSheet, Text, View} from "react-native";

import {SVG} from "@/assets/svgs";
import {BestReviews, CurationCarousel, Modal, SizedBox} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import typography from "@/constants/typography";
import {useModal} from "@/hooks";

export default function HomeScreen({route}: ScreenProps) {
  const {visible, openModal, closeModal} = useModal();

  useFocusEffect(
    React.useCallback(() => {
      const shouldWelcome = (route.params as {shouldWelcome?: boolean})?.shouldWelcome ?? false;
      if (shouldWelcome) openModal();
    }, []),
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
        visible={visible}
        IconComponent={<SVG.Icon.SignUp width={80} height={80} />}
        title="환영합니다!"
        description="온더보드에서 보드게임에 푹 빠질 준비 되셨나요?"
        onRequestClose={closeModal}
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

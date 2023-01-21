import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StyleSheet, Text, View} from "react-native";

import {OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import style from "@/constants/style";
import typography from "@/constants/typography";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingRecommendationScreen({navigation}: Props) {
  return (
    <View style={[style.container, styles.container]}>
      <Text style={[typography.display04, effects.textDropShadow, styles.title]}>
        추천 보드게임
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.body01, effects.textDropShadow, styles.description]}>
        온더보드가 추천해주는 보드게임입니다!
        {"\n"}더 많은 정보가 궁금하시다면 회원가입해주세요.
      </Text>

      <SizedBox height={60} />
      <View style={styles.recommendationContainer}></View>
      <SizedBox height={26} />

      <OTBButton type="basic-primary" text="더 많은 게임 둘러보기" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 0},
  title: {color: colors.white},
  description: {color: colors.OTBBlack500},
  recommendationContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default OnboardingRecommendationScreen;

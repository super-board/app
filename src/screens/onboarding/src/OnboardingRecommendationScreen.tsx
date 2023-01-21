import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";

import {OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useSaveOnboardingResult} from "@/hooks/onboarding";
import {useGetRecommendedBoardGamesQuery} from "@/services/api";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingRecommendationScreen({navigation}: Props) {
  const {isLoading, data: recommendedBoardGames} = useGetRecommendedBoardGamesQuery();
  const {isSubmitting, saveOnboardingResult} = useSaveOnboardingResult();

  const submitOnboardingResult = async () => {
    await saveOnboardingResult();
    navigation.navigate("Home");
  };

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
      <View style={styles.recommendationContainer}>
        <ScrollView>
          {!isLoading && recommendedBoardGames
            ? recommendedBoardGames.map((boardGame, index) => (
                <View key={boardGame.id} style={{gap: 8}}>
                  <View style={styles.boardGameContainer}>
                    <Text style={[typography.subhead01, typography.textWhite]}>{index + 1}</Text>
                    <Text
                      style={[typography.subhead01, typography.textWhite, styles.boardGameTitle]}>
                      {boardGame.name}
                    </Text>
                    <Image
                      style={styles.boardGameImage}
                      // FIXME: 백엔드 API 연결 시 imageUrl로 교체
                      source={require("@/assets/images/fallback/board-game-fallback.png")}
                    />
                  </View>
                  {index < recommendedBoardGames.length - 1 ? (
                    <View style={styles.horizontalDivider} />
                  ) : null}
                </View>
              ))
            : null}
        </ScrollView>
      </View>
      <SizedBox height={26} />

      <OTBButton
        type="basic-primary"
        text="더 많은 게임 둘러보기"
        disabled={isSubmitting}
        onPress={submitOnboardingResult}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 0},
  title: {color: colors.white},
  description: {color: colors.OTBBlack500},
  recommendationContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
    overflow: "hidden",
  },
  boardGameContainer: {
    flexDirection: "row",
    gap: 8,
  },
  boardGameTitle: {
    flex: 1,
  },
  boardGameImage: {
    width: 96,
    height: 96,
    borderRadius: 5,
    overflow: "hidden",
  },
  horizontalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.OTBBlack700,
    marginBottom: 8,
  },
});

export default OnboardingRecommendationScreen;

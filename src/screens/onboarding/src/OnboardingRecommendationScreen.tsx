import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";

import {api} from "@/api";
import {OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import {network} from "@/constants/network";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useRefetchQuery} from "@/hooks";
import {useFavoriteTagsStore, useOnboardingStore} from "@/zustand-stores";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingRecommendationScreen({navigation}: Props) {
  const {tagIds, saveFavoriteTags} = useFavoriteTagsStore();
  const {isLoading, data: paginatedBoardGames} = useRefetchQuery(
    ["boardgames/searchByTag", tagIds.join("&")],
    () => api.boardGame.fetchBoardGamesCuration({limit: 5, offset: 1, tagIds}),
  );
  const {completeOnboarding} = useOnboardingStore();

  const submitOnboardingResult = async () => {
    await Promise.allSettled([saveFavoriteTags(tagIds), completeOnboarding()]);
    navigation.reset({index: 0, routes: [{name: "BottomTabView"}]});
  };

  return (
    <View style={style.screenWithAppBarContainer}>
      <Text style={[typography.display04, effects.textDropShadow, styles.title]}>
        추천 보드게임
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.body01, effects.textDropShadow, styles.description]}>
        온더보드가 추천해주는 보드게임입니다!
      </Text>

      <SizedBox height={60} />
      <View style={styles.recommendationContainer}>
        <ScrollView>
          {!isLoading && paginatedBoardGames
            ? paginatedBoardGames.content.map((boardGame, index) => (
                <View key={boardGame.id} style={{gap: 8}}>
                  <View style={styles.boardGameContainer}>
                    <Text style={[typography.subhead01, typography.textWhite]}>{index + 1}</Text>
                    <Text
                      style={[typography.subhead01, typography.textWhite, styles.boardGameTitle]}>
                      {boardGame.name}
                    </Text>
                    <FastImage
                      style={styles.boardGameImage}
                      source={{uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`}}
                    />
                  </View>
                  {index < paginatedBoardGames.content.length - 1 ? (
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
        onPress={submitOnboardingResult}
      />
      <SizedBox height={36} />
    </View>
  );
}

const styles = StyleSheet.create({
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

import React from "react";

import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import effects from "@/constants/effects";
import typography from "@/constants/typography";
import {BoardGameSummary, useGetBoardGamesForHomeCurationQuery} from "@/services/api";

export default function CurationCarousel() {
  const {width: screenWidth} = Dimensions.get("window");
  const {isLoading, data: boardGames} = useGetBoardGamesForHomeCurationQuery();

  if (isLoading || !boardGames) return <View style={styles.container} />;

  const renderItem = ({item}: {item: BoardGameSummary}) => {
    return (
      <View style={styles.itemContainer}>
        {/* FIXME: item에서 이미지 source 불러오게 변경*/}
        <Image source={require("@/assets/images/fallback/board-game-fallback.png")} />
        <Text
          style={[
            typography.subhead01,
            typography.textWhite,
            typography.textCenter,
            effects.textDropShadow,
            styles.itemTitle,
          ]}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        pagingEnabled={true}
        snapEnabled={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.937,
          parallaxScrollingOffset: 120,
        }}
        width={screenWidth}
        height={screenWidth * 0.8}
        data={boardGames}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: "100%"},
  itemContainer: {justifyContent: "center", alignItems: "center"},
  itemTitle: {marginTop: -12},
});

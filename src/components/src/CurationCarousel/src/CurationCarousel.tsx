import React from "react";

import {Dimensions, StyleSheet, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import {api} from "@/api";
import {useRefetchQuery} from "@/hooks";
import {BoardGameSummary} from "@/types";

import CurationCarouselItem from "./CurationCarouselItem";

export default function CurationCarousel() {
  const {width: screenWidth} = Dimensions.get("window");
  const {isLoading, data: boardGames} = useRefetchQuery(
    ["boardgames/home"],
    api.boardGame.fetchBoardGamesForHome,
  );

  if (isLoading || !boardGames) return <View style={styles.container} />;

  const renderItem = ({item}: {item: BoardGameSummary}) => (
    <CurationCarouselItem boardGame={item} />
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={3000}
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
});

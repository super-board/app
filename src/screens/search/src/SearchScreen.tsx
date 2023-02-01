import React, {useCallback} from "react";

import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";

import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import type {BoardGameSummary} from "@/services/api";
import {useGetTop10BoardGamesQuery} from "@/services/api";

export default function SearchScreen() {
  const {isLoading, data: boardGames} = useGetTop10BoardGamesQuery();

  const renderItem = useCallback(
    ({item}: {item: BoardGameSummary}) => <BoardGameListItem boardGame={item} />,
    [],
  );
  const keyExtractor = useCallback((item: BoardGameSummary) => item.id.toString(), []);

  if (isLoading || !boardGames) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <SizedBox height={8} />
      <Text style={[typography.subhead01, typography.textWhite]}>인기 보드게임</Text>
      <SizedBox height={16} />
      <FlatList
        data={boardGames}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        numColumns={2}
        columnWrapperStyle={{gap: LIST_ITEM_GAP}}
      />
    </View>
  );
}

function BoardGameListItem({boardGame}: {boardGame: BoardGameSummary}) {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={require("@/assets/images/fallback/board-game-fallback.png")}
        style={styles.thumbnail}
      />
    </View>
  );
}

function ItemSeparator() {
  return <SizedBox height={LIST_ITEM_GAP} />;
}

const LIST_ITEM_GAP = 8;
const SCREEN_PADDING_HORIZONTAL = 24;
const SCREEN_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    backgroundColor: colors.OTBBlack,
  },
  itemContainer: {
    borderRadius: 4,
    overflow: "hidden",
  },
  thumbnail: {
    width: (SCREEN_WIDTH - SCREEN_PADDING_HORIZONTAL * 2 - LIST_ITEM_GAP) / 2,
    height: (SCREEN_WIDTH - SCREEN_PADDING_HORIZONTAL * 2 - LIST_ITEM_GAP) / 2,
  },
});

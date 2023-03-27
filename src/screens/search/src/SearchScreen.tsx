import React, {useCallback, useEffect, useState} from "react";

import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";

import {BoardGameListView, SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useSearchQuery} from "@/hooks/searchQuery";
import {BoardGameSummary, useGetBoardGamesByNameQuery, useGetTop10BoardGamesQuery} from "@/store";

export default function SearchScreen() {
  const {isLoading: isTop10BoardGamesLoading, data: top10BoardGames} = useGetTop10BoardGamesQuery();
  const {searchQuery, resetSearchQuery} = useSearchQuery();
  const [page, setPage] = useState(1);
  const {isLoading: isSearchResultsLoading, data: searchResults} = useGetBoardGamesByNameQuery({
    query: searchQuery,
    page,
  });

  const renderItem = useCallback(
    ({item}: {item: BoardGameSummary}) => <BoardGameListItem boardGame={item} />,
    [],
  );
  const keyExtractor = useCallback((item: BoardGameSummary) => item.id.toString(), []);

  const onLoadNextPage = () => {
    setPage(() => page + 1);
  };

  useEffect(() => {
    resetSearchQuery();
  }, []);

  if (isTop10BoardGamesLoading || isSearchResultsLoading || !top10BoardGames || !searchResults)
    return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      {searchQuery ? (
        <BoardGameListView
          key={searchQuery}
          style={styles.searchResultsContainer}
          boardGames={searchResults}
          hasNextPage={true}
          onLoadNextPage={onLoadNextPage}
          contentContainerStyle={{paddingBottom: 48}}
        />
      ) : (
        <>
          <SizedBox height={8} />
          <Text style={[typography.subhead01, typography.textWhite]}>인기 보드게임</Text>
          <SizedBox height={16} />
          <FlatList
            data={top10BoardGames}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparator}
            numColumns={2}
            columnWrapperStyle={{gap: LIST_ITEM_GAP}}
          />
        </>
      )}
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
  searchResultsContainer: {
    paddingHorizontal: 0,
    paddingVertical: 24,
  },
});

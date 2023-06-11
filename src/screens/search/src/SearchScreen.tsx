import React, {useCallback, useEffect, useState} from "react";

import {useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {api} from "@/api";
import {BoardGameListView, SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useNavigateToBoardGameDetails, useRefetchQuery} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";
import {BoardGameSummary} from "@/types";
import {useReviewFormStore, useSearchStore} from "@/zustand-stores";

export default function SearchScreen() {
  const {isLoading: isTop10BoardGamesLoading, data: top10BoardGames} = useRefetchQuery(
    ["boardgames/top10"],
    api.boardGame.fetchBoardGamesTop10,
  );
  const {searchQuery, resetSearchQuery} = useSearchStore();
  const [page, setPage] = useState(1);
  // FIXME: 연동시 무한스크롤로 변경
  const {isLoading: isSearchResultsLoading, data: searchResults} = useRefetchQuery(
    ["boardgames/searchBoardgmaeList", searchQuery],
    api.boardGame.fetchBoardGames,
  );

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
          boardGames={searchResults.content}
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const params = useRoute().params as {from: "write"};
  const {navigateToBoardGameDetails} = useNavigateToBoardGameDetails(boardGame.id);
  const {selectBoardGame} = useReviewFormStore();

  const onPress = () => {
    if (params && params.from === "write") {
      selectBoardGame(boardGame);
      navigation.goBack();
      return;
    }

    navigateToBoardGameDetails();
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.itemContainer} onPress={onPress}>
      <Image
        source={require("@/assets/images/fallback/board-game-fallback.png")}
        style={styles.thumbnail}
      />
    </TouchableOpacity>
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

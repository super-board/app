import React, {useCallback, useEffect} from "react";

import {useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Dimensions, FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import FastImage from "react-native-fast-image";

import {api} from "@/api";
import {BoardGameListView, SizedBox} from "@/components";
import colors from "@/constants/colors";
import {network} from "@/constants/network";
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
  const {
    isLoading: isSearchLoading,
    data,
    fetchNextPage,
  } = useInfiniteQuery(
    ["boardgames/search", searchQuery],
    ({pageParam = 0}) =>
      api.boardGame.fetchBoardGames({query: searchQuery, limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const searchResult = data?.pages.flatMap(page => page.content) ?? [];

  const renderItem = useCallback(
    ({item}: {item: BoardGameSummary}) => <BoardGameListItem boardGame={item} />,
    [],
  );
  const keyExtractor = useCallback((item: BoardGameSummary) => item.id.toString(), []);

  useEffect(() => {
    resetSearchQuery();
  }, []);

  if (isTop10BoardGamesLoading || isSearchLoading || !top10BoardGames || !data)
    return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      {searchQuery ? (
        <BoardGameListView
          key={searchQuery}
          style={styles.searchResultsContainer}
          boardGames={searchResult}
          hasNextPage={true}
          onLoadNextPage={() => fetchNextPage({pageParam: data!.pageParams.length})}
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
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <FastImage
        style={styles.thumbnail}
        source={{uri: `${network.IMAGE_BASE_URL}/${boardGame.image}`}}
      />
    </Pressable>
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

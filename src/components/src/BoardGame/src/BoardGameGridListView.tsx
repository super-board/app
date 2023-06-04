import React, {useCallback} from "react";

import {FlatList, StyleProp, StyleSheet, ViewStyle} from "react-native";

import SizedBox from "@/components/src/SizedBox";
import type {BoardGameSummary, FavoriteBoardGame} from "@/types";

import BoardGameGridListItem from "./BoardGameGridListItem";

type Props = {
  boardGames: Pick<BoardGameSummary, "id" | "name" | "image">[];
  hasNextPage?: boolean;
  onLoadNextPage?: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function FavoriteBoardGameGridListView({
  boardGames,
  hasNextPage = false,
  onLoadNextPage = () => {},
  style,
  contentContainerStyle,
}: Props) {
  const onEndReached = () => {
    if (hasNextPage) onLoadNextPage();
  };

  const renderItem = useCallback(
    ({item}: {item: FavoriteBoardGame}) => <BoardGameGridListItem boardGame={item} />,
    [],
  );
  const keyExtractor = useCallback(
    (item: Pick<BoardGameSummary, "id" | "name" | "image">, index: number) => `${index}-${item.id}`,
    [],
  );

  return (
    <FlatList
      style={[styles.container, style]}
      data={boardGames}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      numColumns={2}
      onEndReachedThreshold={0.8}
      onEndReached={onEndReached}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

function ItemSeparator() {
  return <SizedBox height={24} />;
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {flexDirection: "row", gap: 8},
});

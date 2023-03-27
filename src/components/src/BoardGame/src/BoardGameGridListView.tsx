import React, {useCallback} from "react";

import {FlatList, StyleProp, StyleSheet, ViewStyle} from "react-native";

import SizedBox from "@/components/src/SizedBox";
import type {BoardGameSummary} from "@/store";

import BoardGameGridListItem from "./BoardGameGridListItem";

type Props = {
  boardGames: BoardGameSummary[];
  hasNextPage?: boolean;
  onLoadNextPage?: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function BoardGameGridListView({
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
    ({item}: {item: BoardGameSummary}) => <BoardGameGridListItem boardGame={item} />,
    [],
  );
  // FIXME: API 연결 후 실제 ID로 처리하기
  const keyExtractor = useCallback(
    (item: BoardGameSummary, index: number) => `${item.id}-${index}`,
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

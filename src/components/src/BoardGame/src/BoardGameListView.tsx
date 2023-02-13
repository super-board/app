import React, {useCallback} from "react";

import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import type {BoardGameSummary} from "@/services/api";

import BoardGameListItem from "./BoardGameListItem";

type Props = {
  boardGames: BoardGameSummary[];
  hasNextPage?: boolean;
  onLoadNextPage?: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function BoardGameSearchResultView({
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
    ({item}: {item: BoardGameSummary}) => <BoardGameListItem boardGame={item} />,
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
      windowSize={5}
      onEndReachedThreshold={0.8}
      onEndReached={onEndReached}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

function ItemSeparator() {
  return <View style={styles.horizontalDivider} />;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  itemContainer: {flexDirection: "row", gap: 8},
  horizontalDivider: {
    width: "100%",
    marginVertical: 8,
    borderTopColor: colors.OTBBlack700,
    borderTopWidth: 1,
  },
  thumbnail: {width: 72, height: 72},
  contentContainer: {flexDirection: "column", gap: 4},
});

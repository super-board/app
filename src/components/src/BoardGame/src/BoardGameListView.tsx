import React, {useCallback} from "react";

import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import type {BoardGameSummary} from "@/types";

import BoardGameListItem from "./BoardGameListItem";

type Props = {
  boardGames: BoardGameSummary[];
  hasNextPage?: boolean;
  onLoadNextPage?: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function BoardGameListView({
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
  const keyExtractor = useCallback((item: BoardGameSummary) => item.id.toString(), []);

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
});

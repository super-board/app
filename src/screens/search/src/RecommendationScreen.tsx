import React from "react";

import {useInfiniteQuery} from "@tanstack/react-query";
import {Pressable, StyleSheet, Text, View} from "react-native";

import {api} from "@/api";
import {BoardGameListView, FavoriteTagsHorizontalView, Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useFavoriteTags, useModal} from "@/hooks";

export default function RecommendationScreen() {
  const {favoriteTags} = useFavoriteTags();
  const tagIds = favoriteTags.map(tag => tag.id);

  const {isLoading, data, fetchNextPage} = useInfiniteQuery(
    ["boardgames/curation", tagIds.join("&")],
    ({pageParam = 0}) =>
      api.boardGame.fetchBoardGamesCuration({tagIds, limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const boardGames = data?.pages.flatMap(page => page.content) ?? [];

  const {visible, openModal, closeModal} = useModal();

  return (
    <View style={styles.container}>
      <FavoriteTagsHorizontalView />

      <View style={{paddingHorizontal: 24}}>
        <Pressable style={styles.tagUpdateLink} onPress={openModal}>
          <Text style={[typography.caption, styles.tagUpdateLinkText]}>태그 재설정</Text>
        </Pressable>
      </View>

      {!isLoading && data ? (
        <BoardGameListView
          key={favoriteTags.join("&")}
          boardGames={boardGames}
          hasNextPage={true}
          onLoadNextPage={() => fetchNextPage({pageParam: data!.pageParams.length})}
          style={{marginTop: 20}}
          contentContainerStyle={{paddingBottom: 20}}
        />
      ) : null}

      <Modal.ResetTags visible={visible} onRequestClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
  },
  tagUpdateLink: {
    alignSelf: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: colors.OTBBlack600,
  },
  tagUpdateLinkText: {
    color: colors.OTBBlack600,
  },
});

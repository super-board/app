import React, {useEffect, useState} from "react";

import {useQuery} from "@tanstack/react-query";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {api} from "@/api";
import {BoardGameListView, FavoriteTagsHorizontalView, Modal} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useFavoriteTags, useModal} from "@/hooks";

export default function RecommendationScreen() {
  const [page, setPage] = useState(0);
  const {favoriteTags} = useFavoriteTags();

  // FIXME: 연동시 무한 스크롤로 변경
  const {isLoading, data: paginatedBoardGames} = useQuery(
    ["boardgames/curation", favoriteTags.map(tag => tag.id).join("&")],
    () => api.boardGame.fetchBoardGamesCuration(favoriteTags.map(tag => tag.id)),
  );
  const {visible, openModal, closeModal} = useModal();

  const onLoadNextPage = () => {
    setPage(() => page + 1);
  };

  useEffect(() => {
    setPage(() => 1);
  }, [favoriteTags]);

  return (
    <View style={styles.container}>
      <FavoriteTagsHorizontalView />

      <View style={{paddingHorizontal: 24}}>
        <TouchableOpacity activeOpacity={1} style={styles.tagUpdateLink} onPress={openModal}>
          <Text style={[typography.caption, styles.tagUpdateLinkText]}>태그 재설정</Text>
        </TouchableOpacity>
      </View>

      {!isLoading && paginatedBoardGames ? (
        <BoardGameListView
          key={favoriteTags.join("&")}
          boardGames={paginatedBoardGames.content}
          hasNextPage={true}
          onLoadNextPage={onLoadNextPage}
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

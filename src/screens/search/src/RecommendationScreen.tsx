import React, {useEffect, useState} from "react";

import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {BoardGameListView, Modal, SelectedTagsHorizontalListView} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useSelectedTagIds} from "@/hooks/common";
import {useModal} from "@/hooks/modal";
import {useGetRecommendedBoardGamesByTagsQuery} from "@/services/api";

export default function RecommendationScreen() {
  const [page, setPage] = useState(0);
  const {selectedTagIds} = useSelectedTagIds();
  const {isLoading, data: boardGames} = useGetRecommendedBoardGamesByTagsQuery({
    tagIds: selectedTagIds,
    page,
  });
  const {visible, openModal, closeModal} = useModal();

  const onLoadNextPage = () => {
    setPage(() => page + 1);
  };

  useEffect(() => {
    setPage(() => 1);
  }, [selectedTagIds]);

  return (
    <View style={styles.container}>
      <SelectedTagsHorizontalListView />

      <View style={{paddingHorizontal: 24}}>
        <TouchableOpacity activeOpacity={1} style={styles.tagUpdateLink} onPress={openModal}>
          <Text style={[typography.caption, styles.tagUpdateLinkText]}>태그 재설정</Text>
        </TouchableOpacity>
      </View>

      {!isLoading && boardGames ? (
        <BoardGameListView
          key={selectedTagIds.join("&")}
          boardGames={boardGames}
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

import React from "react";

import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {Modal, SelectedTagsHorizontalListView} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useModal} from "@/hooks/modal";

export default function RecommendationScreen() {
  const {visible, openModal, closeModal} = useModal();

  return (
    <View style={styles.container}>
      <SelectedTagsHorizontalListView />

      <View style={{paddingHorizontal: 24}}>
        <TouchableOpacity activeOpacity={1} style={styles.tagUpdateLink} onPress={openModal}>
          <Text style={[typography.caption, styles.tagUpdateLinkText]}>태그 재설정</Text>
        </TouchableOpacity>
      </View>

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

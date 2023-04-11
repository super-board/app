import React, {useCallback} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {Modal, OTBButton, SizedBox, TagChip} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useSelectedTagIds} from "@/hooks/common";
import {useModal} from "@/hooks/modal";
import {useGetTagListQuery} from "@/store";

export default function TagSelectScreen({navigation, route}: ScreenProps) {
  const {isLoading, data: tagList} = useGetTagListQuery();
  const {selectedTagIds, toggleTag, resetSelectedTags, isSelectedTag} = useSelectedTagIds();
  const {visible: warnVisible, openModal: openWarnModal, closeModal: closeWarnModal} = useModal();

  const toggleTagSelection = (id: number) => {
    if (!isSelectedTag(id) && selectedTagIds.length === 5) {
      openWarnModal();
      return;
    }

    toggleTag(id);
  };

  const onNextPage = () => {
    navigation.navigate("RegisterTermsAndConditionsScreen", {
      ...route.params,
      tagIds: selectedTagIds,
    });
  };

  useFocusEffect(
    useCallback(() => {
      resetSelectedTags();
    }, []),
  );

  return (
    <View style={style.screenWithAppBarContainer}>
      <Text style={[typography.display04, effects.textDropShadow, styles.title]}>
        관심 태그 선택
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.body01, effects.textDropShadow, styles.description]}>
        보드게임 추천을 위해 관심 태그를 선택해주세요.
        {"\n"}
        관심태그는 총 5개까지 선택 가능해요.
      </Text>

      <SizedBox height={60} />
      <View style={styles.tagSelectContainer}>
        {!isLoading && tagList ? (
          <ScrollView>
            {tagList.map(tagGroup => (
              <View key={tagGroup.type} style={styles.tagGroupContainer}>
                <Text style={[typography.body01, styles.tagGroupName]}>{tagGroup.type}</Text>
                <SizedBox height={8} />
                <View style={styles.tagContainer}>
                  {tagGroup.tags.map(tag => (
                    <TouchableOpacity
                      key={tag.id}
                      activeOpacity={1}
                      onPress={() => toggleTagSelection(tag.id)}>
                      <TagChip text={tag.name} active={isSelectedTag(tag.id)} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
      <SizedBox height={26} />

      <OTBButton
        type="basic-primary"
        text="다음"
        disabled={isLoading || !selectedTagIds.length}
        onPress={onNextPage}
        style={{marginBottom: 40}}
      />
      <SizedBox height={36} />

      <Modal.Warn
        visible={warnVisible}
        title="관심 태그는 5개까지 고를 수 있어요."
        onRequestClose={closeWarnModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {color: colors.white},
  description: {color: colors.OTBBlack500},
  tagSelectContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
    overflow: "hidden",
  },
  tagGroupContainer: {paddingVertical: 8},
  tagGroupName: {color: colors.white},
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

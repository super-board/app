import React, {useEffect, useState} from "react";

import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import {useSelectedTagIds} from "@/hooks/common";
import type {Tag} from "@/store";
import {useGetTagListQuery} from "@/store";

import SizedBox from "../../SizedBox";
import TagChip, {TagChipType} from "./TagChip";

type Props = {
  insetPadding?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  chipType?: TagChipType;
};

export default function SelectedTagsHorizontalListView({
  insetPadding = 24,
  gap = 8,
  style,
  chipType = "active",
}: Props) {
  const {isLoading, data: tagList} = useGetTagListQuery();
  const {selectedTagIds} = useSelectedTagIds();
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (isLoading || !tagList) return;
    const selectedTags = tagList
      .map(tagGroup => tagGroup.tags)
      .flat()
      .filter(tag => selectedTagIds.includes(tag.id));

    setFilteredTags(() => selectedTags);
  }, [isLoading, tagList, selectedTagIds]);

  if (isLoading || !tagList) return <View style={[styles.container, style]} />;

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal>
        <SizedBox width={insetPadding} />
        {filteredTags.map(tag => (
          <View key={tag.id} style={styles.row}>
            <TagChip type={chipType} text={tag.name} />
            <SizedBox width={gap} />
          </View>
        ))}
        <SizedBox width={insetPadding - gap} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingVertical: 8,
  },
  row: {flexDirection: "row"},
});

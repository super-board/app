import React, {useEffect, useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {useSelectedTagIds} from "@/hooks/common";
import type {Tag} from "@/services/api";
import {useGetTagListQuery} from "@/services/api";

import SizedBox from "../../SizedBox";
import TagChip from "./TagChip";

export default function SelectedTagsHorizontalListView() {
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

  if (isLoading || !tagList) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <SizedBox width={16} />
        {filteredTags.map(tag => (
          <View key={tag.id} style={styles.row}>
            <TagChip text={tag.name} active />
            <SizedBox width={8} />
          </View>
        ))}
        <SizedBox width={8} />
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

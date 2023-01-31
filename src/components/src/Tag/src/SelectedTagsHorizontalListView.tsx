import React, {useEffect, useState} from "react";

import {ScrollView, StyleSheet, View} from "react-native";

import {useSelectedTagIds} from "@/hooks/onboarding";
import type {Tag} from "@/services/api";
import {useGetTagsQuery} from "@/services/api";

import SizedBox from "../../SizedBox";
import TagChip from "./TagChip";

export default function SelectedTagsHorizontalListView() {
  const {isLoading, data: interestTags} = useGetTagsQuery();
  const {selectedTagIds} = useSelectedTagIds();
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (isLoading || !interestTags) return;
    const selectedTags = interestTags
      .map(tagGroup => tagGroup.tags)
      .flat()
      .filter(tag => selectedTagIds.includes(tag.id));

    setFilteredTags(() => selectedTags);
  }, [isLoading, interestTags, selectedTagIds]);

  if (isLoading || !interestTags) return <View style={styles.container} />;

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

import React from "react";

import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from "react-native";

import {useFavoriteTags} from "@/hooks";

import SizedBox from "../../SizedBox";
import TagChip, {TagChipType} from "./TagChip";

type Props = {
  insetPadding?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  chipType?: TagChipType;
};

export default function FavoriteTagsHorizontalView({
  insetPadding = 24,
  gap = 8,
  style,
  chipType = "active",
}: Props) {
  const {isLoading, favoriteTags} = useFavoriteTags();

  if (isLoading) return <View style={[styles.container, style]} />;

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal>
        <SizedBox width={insetPadding} />
        {favoriteTags.map(tag => (
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

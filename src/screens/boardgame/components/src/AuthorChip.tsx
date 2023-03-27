import React from "react";

import {StyleSheet, Text, View} from "react-native";

import {LevelIcon, ProfileImage, SizedBox} from "@/components";
import typography from "@/constants/typography";
import {MemberSummary} from "@/store";

type Props = {
  author: MemberSummary;
};

export default function AuthorChip({author}: Props) {
  return (
    <View style={styles.container}>
      <ProfileImage type={author.profileCharacter} width={24} height={24} />
      <SizedBox width={10} />
      <Text style={[typography.caption, typography.textWhite]}>{author.nickname}</Text>
      <SizedBox width={4} />
      <LevelIcon level={author.level} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

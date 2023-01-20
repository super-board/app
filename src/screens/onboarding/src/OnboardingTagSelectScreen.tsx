import React from "react";

import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ScrollView, StyleSheet, Text, View} from "react-native";

import {OTBButton, OTBButtonTag, SizedBox} from "@/components";
import colors from "@/constants/colors";
import effects from "@/constants/effects";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useSelectedTagIds} from "@/hooks/onboarding";
import {useGetTagsQuery} from "@/services/api";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function OnboardingTagSelectScreen({navigation}: Props) {
  const {isLoading, data: tagGroups} = useGetTagsQuery();
  const {selectedTagIds, toggleTag} = useSelectedTagIds();

  return (
    <View style={[style.container, styles.container]}>
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
        {!isLoading && tagGroups ? (
          <ScrollView>
            {tagGroups.map(tagGroup => (
              <View key={tagGroup.type} style={styles.tagGroupContainer}>
                <Text style={[typography.body01, styles.tagGroupName]}>{tagGroup.type}</Text>
                <SizedBox height={8} />
                <View style={styles.tagContainer}>
                  {tagGroup.tags.map(tag => (
                    <OTBButtonTag
                      key={tag.id}
                      text={tag.name}
                      active={selectedTagIds.includes(tag.id)}
                      onPress={() => toggleTag(tag.id)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
      <SizedBox height={26} />

      <OTBButton type="basic-secondary" text="다음" disabled={selectedTagIds.length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 0},
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

export default OnboardingTagSelectScreen;

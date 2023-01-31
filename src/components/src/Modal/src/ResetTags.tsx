import React, {useEffect, useState} from "react";

import type {NativeSyntheticEvent} from "react-native";
import {
  Modal as DefModal,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useSelectedTagIds} from "@/hooks/common";
import {useSaveOnboardingResult} from "@/hooks/onboarding";
import {useGetTagsQuery} from "@/services/api";

import OTBButton from "../../OTBButton";
import SizedBox from "../../SizedBox";
import {TagChip} from "../../Tag";
import type {ModalProps} from "./types";

export default function ResetTags({visible, onRequestClose}: ModalProps) {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const {isLoading, data: tagGroups} = useGetTagsQuery();
  const {selectedTagIds: storedSelectedTagIds, updateSelectedTags} = useSelectedTagIds();
  const {saveOnboardingResult} = useSaveOnboardingResult();

  const isSelectedTag = (id: number) => selectedTagIds.includes(id);

  const toggleTag = (targetId: number) => {
    const isSelected = isSelectedTag(targetId);
    if (!isSelected && selectedTagIds.length === 5) {
      // TODO: 토스트 알림 띄우기
      return;
    }

    if (isSelected) {
      const filtered = selectedTagIds.filter(id => id !== targetId);
      setSelectedTagIds(() => filtered);
      return;
    }

    setSelectedTagIds(() => [...selectedTagIds, targetId]);
  };

  const resetSelectedTags = () => {
    setSelectedTagIds(() => []);
  };

  const onSave = (event: NativeSyntheticEvent<any>) => {
    updateSelectedTags(selectedTagIds);
    saveOnboardingResult();
    onRequestClose?.call(null, event);
  };

  useEffect(() => {
    setSelectedTagIds(() => storedSelectedTagIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefModal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}>
      <View style={styles.screenContainer}>
        <TouchableOpacity onPress={onRequestClose} activeOpacity={1} style={styles.backdrop} />

        <View style={styles.modalContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.close} onPress={onRequestClose}>
            <SVG.Icon.Close width={30} height={30} />
          </TouchableOpacity>
          <View style={styles.tagSelectContainer}>
            {!isLoading && tagGroups ? (
              <ScrollView>
                {tagGroups.map(tagGroup => (
                  <View key={tagGroup.type} style={styles.tagGroupContainer}>
                    <Text style={[typography.body01, styles.tagGroupName]}>{tagGroup.type}</Text>
                    <SizedBox height={8} />
                    <View style={styles.tagContainer}>
                      {tagGroup.tags.map(tag => (
                        <TouchableOpacity
                          key={tag.id}
                          activeOpacity={1}
                          onPress={() => toggleTag(tag.id)}>
                          <TagChip text={tag.name} active={isSelectedTag(tag.id)} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : null}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <OTBButton
            type="short-tertiary"
            style={styles.button}
            text="초기화"
            onPress={resetSelectedTags}
          />
          <OTBButton
            type="short-secondary"
            style={styles.button}
            text="저장"
            onPress={onSave}
            disabled={!selectedTagIds.length}
          />
        </View>
      </View>
    </DefModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
  },
  modalContainer: {
    backgroundColor: colors.OTBBlack800,
    width: Dimensions.get("window").width * 0.7 + 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    width: "35%",
  },
  close: {
    marginTop: 8,
    marginRight: 8,
    alignSelf: "flex-end",
  },
  tagSelectContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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

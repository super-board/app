import React from "react";

import {useQuery} from "@tanstack/react-query";
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
import Toast from "react-native-toast-message";

import {api} from "@/api";
import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useFavoriteTagsForm} from "@/hooks";
import {useFavoriteTagsStore, useOnboardingStore} from "@/zustand-stores";

import OTBButton from "../../OTBButton";
import SizedBox from "../../SizedBox";
import {TagChip} from "../../Tag";
import ToastConfig from "../../ToastConfig";
import type {ModalProps} from "./types";

export default function ResetTags({visible, onRequestClose}: ModalProps) {
  const {isLoading, data: tagList} = useQuery(["tags"], api.tag.fetchTags);
  const {selectedTagIds, isSelectedTag, toggleTag, resetSelectedTags} = useFavoriteTagsForm();
  const {saveFavoriteTags} = useFavoriteTagsStore();
  const {completeOnboarding} = useOnboardingStore();

  const onSave = (event: NativeSyntheticEvent<any>) => {
    saveFavoriteTags(selectedTagIds);
    completeOnboarding();
    onRequestClose?.call(null, event);
  };

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
                          onPress={() => toggleTag(tag.id)}>
                          <TagChip
                            type={isSelectedTag(tag.id) ? "active" : "inactive"}
                            text={tag.name}
                          />
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

      <Toast config={ToastConfig} />
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
    width: Dimensions.get("window").width * 0.7 + 8,
    maxHeight: "50%",
    paddingBottom: 36,
    backgroundColor: colors.OTBBlack800,
    borderRadius: 5,
    overflow: "hidden",
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
    paddingHorizontal: 18,
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

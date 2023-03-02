import React, {useState} from "react";

import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {useGetMyMemberInfoQuery} from "@/store";

import AuthorChip from "./AuthorChip";

export default function CommentForm() {
  const [comment, setComment] = useState("");
  const {isLoading, data: myInfo} = useGetMyMemberInfoQuery();

  if (isLoading || !myInfo) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <AuthorChip author={myInfo} />

      <View style={styles.row}>
        <View style={styles.textareaContainer}>
          <TextInput
            style={styles.textarea}
            multiline={true}
            value={comment}
            onChangeText={setComment}
            cursorColor={colors.white}
            placeholder="최소 10자 이상 입력해주세요"
            placeholderTextColor={colors.OTBBlack500}
            maxLength={200}
          />
          <Text style={[typography.caption, styles.letterCounter]}>{comment.length}/200</Text>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={[typography.subhead03, typography.textWhite]}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: 12},
  row: {flexDirection: "row", gap: 4},
  textareaContainer: {flex: 1, position: "relative"},
  textarea: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 42,
    borderRadius: 4,
    backgroundColor: colors.OTBBlack700,
    color: colors.white,
  },
  letterCounter: {
    position: "absolute",
    bottom: 8,
    right: 8,
    color: colors.OTBBlack500,
  },
  submitButton: {
    width: 46,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.OTBBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});

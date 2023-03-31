import React from "react";

import {StyleSheet, Text, TextInput} from "react-native";

import {KeyboardView, OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useTextInput} from "@/hooks/form";

export default function NewInquiryScreen() {
  const {value: title, onChangeText: onChangeTitle} = useTextInput();
  const {value: content, onChangeText: onChangeContent} = useTextInput();

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <SizedBox height={24} />
      <Text style={[typography.body02, typography.textWhite]}>제목</Text>
      <SizedBox height={8} />
      <TextInput
        style={[typography.body01, typography.textWhite, styles.textInput]}
        value={title}
        onChangeText={onChangeTitle}
        placeholder="제목을 입력해주세요"
        placeholderTextColor={colors.OTBBlack500}
        cursorColor={colors.white}
      />
      <SizedBox height={16} />
      <Text style={[typography.body02, typography.textWhite]}>내용</Text>
      <SizedBox height={8} />
      <TextInput
        style={[typography.body01, typography.textWhite, styles.textarea]}
        multiline
        value={content}
        onChangeText={onChangeContent}
        placeholder="내용을 입력해주세요"
        placeholderTextColor={colors.OTBBlack500}
        cursorColor={colors.white}
      />

      <SizedBox height={16} />
      <OTBButton type="basic-primary" text="등록" disabled={!title || !content} />
      <SizedBox height={92} />
    </KeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {backgroundColor: colors.OTBBlack700, borderRadius: 4, padding: 16},
  textarea: {
    flex: 1,
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
    padding: 16,
    textAlignVertical: "top",
  },
});

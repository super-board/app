import React from "react";

import {MaterialTopTabNavigationProp} from "@react-navigation/material-top-tabs";
import {useNavigation} from "@react-navigation/native";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StyleSheet, Text, TextInput} from "react-native";

import {api} from "@/api";
import {KeyboardView, OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useTextInput} from "@/hooks";
import {MyPageInquiryTabParamList} from "@/navigation/navigation";

export default function NewInquiryScreen() {
  const {value: title, onChangeText: onChangeTitle} = useTextInput();
  const {value: content, onChangeText: onChangeContent} = useTextInput();

  const navigation = useNavigation<MaterialTopTabNavigationProp<MyPageInquiryTabParamList>>();
  const queryClient = useQueryClient();
  const {mutate: postInquiry, isLoading} = useMutation(
    ["inquiries/post"],
    api.inquiry.postInquiry,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inquiries"]);
        navigation.navigate("MyPageMyInquiriesScreen");
      },
    },
  );

  const onSubmit = () => {
    postInquiry({title, content});
  };

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
        style={[typography.body01, typography.textWhite, styles.textarea, {minHeight: 200}]}
        multiline
        value={content}
        onChangeText={onChangeContent}
        placeholder="내용을 입력해주세요"
        placeholderTextColor={colors.OTBBlack500}
        cursorColor={colors.white}
      />

      <SizedBox height={16} />
      <OTBButton
        type="basic-primary"
        text="등록"
        onPress={onSubmit}
        disabled={!title || !content || isLoading}
      />
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

import React from "react";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StyleSheet, Text, TextInput} from "react-native";

import {api} from "@/api";
import {KeyboardView, OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useTextInput} from "@/hooks";
import {RootStackParamList} from "@/navigation/navigation";

export default function Notice() {
  const {value: title, onChangeText: onChangeTitle} = useTextInput();
  const {value: content, onChangeText: onChangeContent} = useTextInput();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const {mutate: postNotice, isLoading} = useMutation(["admin/notice/post"], api.admin.postNotice, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notices"], refetchType: "all"});
      navigation.goBack();
    },
  });

  const onSubmit = () => {
    postNotice({title, content});
  };

  return (
    <KeyboardView style={style.screenWithAppBarContainer}>
      <SizedBox height={16} />
      <Text style={[typography.headline, typography.textWhite]}>공지사항</Text>
      <SizedBox height={32} />
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
      <SizedBox height={60} />
    </KeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  textarea: {
    flex: 1,
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
    padding: 16,
    textAlignVertical: "top",
  },
});

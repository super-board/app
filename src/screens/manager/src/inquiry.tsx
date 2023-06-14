import React, {useState} from "react";

import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";

import {api} from "@/api";
import {SVG} from "@/assets/svgs";
import {Modal, OTBButton, SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal} from "@/hooks";
import {InquiryAdmin} from "@/types";

export default function InquiryScreen() {
  const {data, fetchNextPage} = useInfiniteQuery(
    ["admin/inquiries"],
    ({pageParam = 0}) => api.admin.fetchInquiries({limit: 10, offset: 10 * pageParam + 1}),
    {getNextPageParam: lastPage => lastPage.pageInfo.hasNext},
  );
  const inquiries = data?.pages.flatMap(page => page.content);

  const renderItem = React.useCallback(
    ({item}: {item: InquiryAdmin}) => <ListItem inquiry={item} />,
    [],
  );

  const itemSeparator = React.useCallback(() => <View style={styles.divider} />, []);

  return (
    <View style={style.screenWithAppBarContainer}>
      <Text style={[typography.headline, styles.inquiry]}>1:1 문의</Text>
      <FlatList
        data={inquiries}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => fetchNextPage({pageParam: data!.pageParams.length})}
      />
    </View>
  );
}

function ListItem({inquiry}: {inquiry: InquiryAdmin}) {
  const {visible, openModal, closeModal} = useModal();
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const {mutate: answerInquiry} = useMutation(["admin/inquiries/answer"], api.admin.answerInquiry, {
    onSuccess: () => queryClient.invalidateQueries(["admin/inquiries"]),
  });

  const onSubmit = () => {
    answerInquiry({id: inquiry.id, answer: content});
  };

  return (
    <>
      <Pressable style={styles.block} onPress={() => setIsExpanded(state => !state)}>
        <Text
          style={[
            typography.subhead03,
            {color: inquiry.isAnswered ? colors.OTBBlack600 : colors.OTBBlueLight1},
          ]}>
          {inquiry.isAnswered ? "답변완료" : "답변대기"}
        </Text>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={[typography.body02, styles.title]}>{inquiry.title}</Text>
            {isExpanded ? (
              <SVG.Icon.ArrowUp width={12} height={8} />
            ) : (
              <SVG.Icon.ArrowDown width={12} height={8} />
            )}
          </View>
          <View style={styles.info}>
            <Text style={[typography.caption, typography.textBlack500]}>{inquiry.nickname}</Text>
            <Text style={[typography.caption, typography.textBlack500]}>
              {inquiry.createdAt.slice(0, 10)}
            </Text>
            <Text style={[typography.caption, typography.textBlack500]}>
              {inquiry.createdAt.slice(11)}
            </Text>
          </View>
        </View>
      </Pressable>
      {isExpanded ? (
        <>
          <SizedBox height={16} />
          <View style={{paddingLeft: 57}}>
            <Text style={[typography.bodyLong02, styles.contentText]}>{inquiry.content}</Text>
          </View>
          <SizedBox height={16} />
          {inquiry.isAnswered ? (
            <View style={{paddingLeft: 57}}>
              <Text style={[typography.bodyLong02, styles.reply]}>{inquiry.answer}</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={[styles.textInput, typography.body01, typography.textWhite]}
                value={content}
                onChangeText={setContent}
                placeholder="내용을 입력해주세요"
                placeholderTextColor={colors.OTBBlack500}
                multiline={true}
              />
              <OTBButton
                type={"basic-primary"}
                text="등록"
                style={styles.otbButton}
                onPress={openModal}
              />
            </>
          )}
        </>
      ) : null}
      <Modal.Dialog
        visible={visible}
        IconComponent={<SVG.Icon.Submit width={48} height={48} />}
        title="등록하시겠습니까?"
        confirmText="확인"
        onConfirm={onSubmit}
        onRequestClose={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inquiry: {
    color: colors.white,
    marginBottom: 32,
  },
  block: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  title: {
    color: colors.white,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 8,
  },
  contentContainer: {
    marginLeft: 8,
    flex: 1,
    gap: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: colors.OTBBlack600,
    marginVertical: 16,
  },
  contentText: {
    color: colors.white,
  },
  textInput: {
    height: 216,
    backgroundColor: colors.OTBBlack700,
    marginTop: 8,
    borderRadius: 4,
    padding: 12,
    textAlignVertical: "top",
    paddingTop: 8,
    fontSize: 16,
  },
  otbButton: {
    marginTop: 8,
  },
  reply: {
    color: colors.OTBBlack400,
  },
});

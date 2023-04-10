import React, {useState} from "react";

import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";

import * as SVG from "@/assets/svgs";
import {Modal, OTBButton} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";
import {useModal} from "@/hooks/modal";

export default function Inquiry({navigation}: ScreenProps) {
  const {visible: visible, openModal: openModal, closeModal: closeModal} = useModal();
  const data = [
    {
      title: "새로나온 보드게임 등록해주세여",
      content: "등록해줘요오오오옹",
      nickname: "12331",
      date: "2023-02-02",
      time: "23:00:15",
    },
    {
      title: "새로나온 보드게임 등록해주세여",
      content: "등록해줘요오오오옹",
      nickname: "12331",
      date: "2023-02-02",
      time: "23:00:15",
      reply:
        "안녕하세요 온더보더 Yeayea님! 새로나온 마스 시리즈라면 <테라포밍 마스 : 격동> 을 말씀하시는 걸까요? 해당 보드게임은 1.2 어플리케이션 업데이트때 등록 완료되었습니다! 혹 어플리케이션이 최신 버전인지 확인해주시고, 확인하신 이후에도 찾지 못하신다면 다시 한 번 1:1 문의 부탁드리겠습니다 :)",
    },
    {
      title: "새로나온 보드게임 등록해주세여",
      content: "등록해줘요오오오옹",
      nickname: "12331",
      date: "2023-02-02",
      time: "23:00:15",
    },
  ];

  function Block(data: any) {
    const {nickname, date, time, title, content, reply} = data.item;
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const onPress = {
      submit: () => {
        openModal();
      },
    };
    return (
      <>
        <TouchableOpacity style={styles.block} onPress={() => setOpen(!open)}>
          <Text
            style={[
              typography.subhead03,
              styles.answer,
              {color: reply ? colors.OTBBlack600 : colors.OTBBlueLight1},
            ]}>
            {reply ? "답변완료" : "답변대기"}
          </Text>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={[typography.body02, styles.title]}>{title}</Text>
              {open ? (
                <SVG.Icon.ArrowUp width={12} height={8} />
              ) : (
                <SVG.Icon.ArrowDown width={12} height={8} />
              )}
            </View>
            <View style={styles.info}>
              <Text style={[typography.caption, styles.caption]}>{nickname}</Text>
              <Text style={[typography.caption, styles.caption]}> {date}</Text>
              <Text style={[typography.caption, styles.caption]}> {time}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {open ? (
          <>
            <View style={{flexDirection: "row"}}>
              <Text style={[typography.subhead03, styles.answer, {color: colors.OTBBlack}]}>
                안보이는
              </Text>
              <Text style={[typography.bodyLong02, styles.contentText]}>{content}</Text>
            </View>
            {reply ? (
              <View style={{flexDirection: "row"}}>
                <Text style={[typography.subhead03, styles.answer, {color: colors.OTBBlack}]}>
                  안보이는
                </Text>
                <Text style={[typography.bodyLong02, styles.reply]}>{reply}</Text>
              </View>
            ) : (
              <>
                <TextInput
                  style={[styles.textInput, typography.body01, typography.textWhite]}
                  onChangeText={text => setText(text)}
                  placeholder="내용을 입력해주세요"
                  placeholderTextColor={colors.OTBBlack500}
                  multiline={true}
                />
                <OTBButton
                  type={"basic-primary"}
                  text="등록"
                  style={styles.otbButton}
                  onPress={onPress.submit}
                />
              </>
            )}
          </>
        ) : null}
      </>
    );
  }

  return (
    <View style={style.screenWithAppBarContainer}>
      <Text style={[typography.headline, styles.inquiry]}>1:1 문의</Text>
      <FlatList
        data={data}
        renderItem={item => <Block {...item} key={item.index} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <Modal.Warn
        visible={visible}
        title="등록하시겠습니까?"
        onRequestClose={closeModal}
        dismissible
        back
        warn={false}
      />
    </View>
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
  },
  answer: {},
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
  },
  caption: {
    color: colors.OTBBlack500,
  },
  contentContainer: {
    marginLeft: 8,
    flex: 1,
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

import React, {useState} from "react";

import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";

import * as SVG from "@/assets/svgs";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";
import typography from "@/constants/typography";

export default function Report({navigation}: ScreenProps) {
  const data = [
    {
      title: "테라포밍 마스: 아레나 익스페디션",
      content: "등록해줘요오오오옹",
      nickname: "12331",
      date: "2023-02-02",
      time: "23:00:15",
    },
    {
      title: "테라포밍 마스: 아레나 익스페디션",
      content:
        "등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹등록해줘요오오오옹",
      nickname: "12331",
      date: "2023-02-02",
      time: "23:00:15",
    },
    {
      title: "테라포밍 마스: 아레나 익스페디션",
      content: "등록해줘요오오오옹",
      nickname: "12331",
      date: "2023-02-02",
      time: "23:00:15",
    },
  ];

  //pressed 추가 작업 필요
  function Block(data: any) {
    const {nickname, date, time, title, content} = data.item;
    const [open, setOpen] = useState(false);

    return (
      <>
        <TouchableOpacity style={styles.block} onPress={() => setOpen(!open)}>
          <View style={styles.contentContainer}>
            <View style={styles.complete}>
              <Text>완료</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={styles.content}>
                <Text style={[typography.body02, styles.text]} numberOfLines={open ? undefined : 1}>
                  {content}
                </Text>
                {open ? (
                  <SVG.Icon.ArrowUp width={12} height={8} />
                ) : (
                  <SVG.Icon.ArrowDown width={12} height={8} />
                )}
              </View>
              <View style={styles.infoContainer}>
                <Text style={[typography.body02, styles.info]}>{nickname}</Text>
                <Text style={[typography.body02, styles.info, {marginLeft: 8}]}>{date}</Text>
                <Text style={[typography.body02, styles.info, {marginLeft: 8}]}>{time}</Text>
              </View>
              <Text style={[typography.caption, styles.caption]}>{title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={style.screenWithAppBarContainer}>
      <FlatList
        data={data}
        renderItem={item => <Block {...item} key={item.index} />}
        ListHeaderComponent={() => <View style={{marginTop: 16}} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        keyExtractor={(item, idx) => idx.toString()}
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
    color: colors.OTBBlack400,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    color: colors.OTBBlack400,
  },
  caption: {
    color: colors.OTBBlack500,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
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
  text: {
    color: colors.white,
  },
  infoContainer: {
    flexDirection: "row",
  },
  complete: {
    backgroundColor: colors.OTBBlack200,
    justifyContent: "center",
    borderRadius: 8,
    width: 40,
    height: 28,
    alignItems: "center",
    marginRight: 16,
  },
});
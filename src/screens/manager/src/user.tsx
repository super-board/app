import React from "react";

import {StyleSheet, Text, View} from "react-native";

import style from "@/constants/style";

export default function User() {
  return (
    <View style={style.screenWithAppBarContainer}>
      <View style={styles.profileContainer}>
        <View>
          <Text>이메일</Text>
          <Text>ontheboard@gmail.com</Text>
          <Text>최초 가입일</Text>
          <Text>최종 방문일</Text>
          <Text>상태</Text>
          <Text>정상</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {},
});

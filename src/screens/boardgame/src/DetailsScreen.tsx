import React, {useEffect} from "react";

import {StyleSheet, Text, View} from "react-native";

import {ScreenProps} from "@/constants/props";
import style from "@/constants/style";

export default function DetailsScreen({navigation, route}: ScreenProps) {
  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <View style={style.screenWithAppBarContainer}>
      <Text>보드게임 정보 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

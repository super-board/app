import React from "react";

import {StyleSheet, View} from "react-native";

import {SizedBox} from "@/components";
import colors from "@/constants/colors";
import style from "@/constants/style";

export default function MainScreenSkeleton() {
  return (
    <View style={[style.screenWithAppBarContainer, styles.screenContainer]}>
      <SizedBox height={20} />
      <View style={{alignItems: "center"}}>
        <View style={[styles.skeleton, styles.profile]} />
      </View>
      <SizedBox height={44} />
      <View style={[styles.skeleton, {height: 64, borderRadius: 8}]} />
      <SizedBox height={16} />
      <View style={[styles.skeleton, {width: 80, height: 24, borderRadius: 4}]} />
      <SizedBox height={14} />
      <View style={[styles.row, {gap: 8}]}>
        <View style={[styles.skeleton, {flex: 1, height: 32, borderRadius: 10}]} />
        <View style={[styles.skeleton, {flex: 1, height: 32, borderRadius: 10}]} />
        <View style={[styles.skeleton, {flex: 1, height: 32, borderRadius: 10}]} />
        <View style={[styles.skeleton, {flex: 1, height: 32, borderRadius: 10}]} />
      </View>
      <SizedBox height={30} />
      <View style={[styles.skeleton, {width: 80, height: 24, borderRadius: 4}]} />
      <SizedBox height={16} />
      <View style={[styles.row, {gap: 6}]}>
        <View style={[styles.skeleton, {flex: 1, aspectRatio: 1, borderRadius: 5}]} />
        <View style={[styles.skeleton, {flex: 1, aspectRatio: 1, borderRadius: 5}]} />
        <View style={[styles.skeleton, {flex: 1, aspectRatio: 1, borderRadius: 5}]} />
      </View>
      <SizedBox height={22} />
      <View style={[styles.skeleton, {width: 80, height: 24, borderRadius: 4}]} />
      <SizedBox height={16} />
      <View style={[styles.row, {gap: 6}]}>
        <View style={[styles.skeleton, {flex: 1, aspectRatio: 1, borderRadius: 5}]} />
        <View style={[styles.skeleton, {flex: 1, aspectRatio: 1, borderRadius: 5}]} />
        <View style={[styles.skeleton, {flex: 1, aspectRatio: 1, borderRadius: 5}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "stretch",
  },
  skeleton: {
    backgroundColor: colors.OTBBlack800,
  },
  profile: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

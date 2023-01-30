import React from "react";

import {ScrollView, StyleSheet, Text, View} from "react-native";

import {BestReviews, CurationCarousel, SizedBox} from "@/components";
import colors from "@/constants/colors";
import typography from "@/constants/typography";

export default function () {
  return (
    <ScrollView style={styles.container}>
      <SizedBox height={16} />
      <View style={styles.screenPadding}>
        <Text style={[typography.headline, typography.textWhite]}>추천게임</Text>
        <Text style={[typography.bodyLong02, styles.description]}>
          요즘은 이런 게임을 많이 하더라구요 🤗
        </Text>
      </View>

      <SizedBox height={24} />
      <CurationCarousel />
      <SizedBox height={48} />

      <View style={styles.screenPadding}>
        <Text style={[typography.headline, typography.textWhite]}>이번주 BEST 리뷰</Text>
        <Text style={[typography.bodyLong02, styles.description]}>
          누가누가 보드게임 전도사?! 🤔
        </Text>

        <SizedBox height={24} />
        <BestReviews />
        <SizedBox height={12} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  screenPadding: {paddingHorizontal: 24},
  description: {
    color: colors.OTBBlack400,
  },
});

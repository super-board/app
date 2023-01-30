import React from "react";

import {ScrollView, StyleSheet, Text, View} from "react-native";

import {CurationCarousel, SizedBox} from "@/components";
import colors from "@/constants/colors";
import {ScreenProps} from "@/constants/props";
import typography from "@/constants/typography";

export default function ({navigation}: ScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <SizedBox height={16} />
      <View style={{paddingHorizontal: 24}}>
        <Text style={[typography.headline, typography.textWhite]}>추천게임</Text>
        <Text style={[typography.bodyLong02, styles.description]}>
          요즘은 이런 게임을 많이 하더라구요 🤗
        </Text>
      </View>

      <SizedBox height={24} />
      <CurationCarousel />
      <SizedBox height={48} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  description: {
    color: colors.OTBBlack400,
  },
});

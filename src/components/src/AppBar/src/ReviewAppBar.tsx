import React from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";
import {Dimensions, StyleSheet, Text} from "react-native";

import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";

import {AppBar} from "./AppBar";
import {AppBarButton} from "./AppBarButton";

export default function RegisterAppBar({navigation}: NativeStackHeaderProps) {
  return (
    <AppBar.Container>
      <AppBar.Header>
        <AppBar.Center>
          <Text style={[typography.subhead01, effects.textDropShadow, styles.title]}>리뷰</Text>
        </AppBar.Center>
        <AppBar.Left marginLeft={24}>
          <AppBarButton.HistoryBack navigation={navigation} />
        </AppBar.Left>
      </AppBar.Header>
    </AppBar.Container>
  );
}

const styles = StyleSheet.create({
  title: {color: colors.OTBBlack50},
  contentContainer: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 64,
    paddingHorizontal: 24,
  },
  searchInput: {
    marginVertical: 8,
    width: "100%",
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: colors.OTBBlack700,
    borderRadius: 4,
  },
  searchButton: {
    position: "absolute",
    top: 20,
    right: 32,
  },
  backdrop: {
    position: "absolute",
    top: 64,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 56 - 64,
    backgroundColor: "#000000",
    opacity: 0.5,
  },
});

import React from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";
import {StyleSheet, Text} from "react-native";

import colors from "@/constants/colors";
import effects from "@/constants/effects";
import typography from "@/constants/typography";

import {AppBar} from "./AppBar";
import {AppBarButton} from "./AppBarButton";

export default function SimpleAppBar({navigation, options}: NativeStackHeaderProps) {
  return (
    <AppBar.Container>
      <AppBar.Header>
        <AppBar.Center>
          <Text style={[typography.subhead01, effects.textDropShadow, styles.title]}>
            {options.title}
          </Text>
        </AppBar.Center>
        {options.headerBackVisible ? (
          <AppBar.Left marginLeft={24}>
            <AppBarButton.HistoryBack navigation={navigation} />
          </AppBar.Left>
        ) : null}
      </AppBar.Header>
    </AppBar.Container>
  );
}

const styles = StyleSheet.create({
  title: {color: colors.OTBBlack50},
});

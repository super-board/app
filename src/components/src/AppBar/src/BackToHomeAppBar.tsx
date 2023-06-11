import React from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";

import {AppBar} from "./AppBar";
import {AppBarButton} from "./AppBarButton";

export default function BackToHomeAppBar({navigation, options}: NativeStackHeaderProps) {
  const onCancel = () => {
    navigation.popToTop();
    navigation.navigate("HomeScreen");
  };

  return (
    <AppBar.Container>
      <AppBar.Header>
        <AppBar.Left marginLeft={24}>
          <AppBarButton.HistoryBack navigation={navigation} />
        </AppBar.Left>
        <AppBar.Right marginRight={24}>
          <AppBarButton.Cancel onPress={onCancel} text={options.headerBackTitle ?? "취소"} />
        </AppBar.Right>
      </AppBar.Header>
    </AppBar.Container>
  );
}

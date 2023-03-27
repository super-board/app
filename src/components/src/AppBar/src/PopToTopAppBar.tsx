import React from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";

import {AppBar} from "./AppBar";
import {AppBarButton} from "./AppBarButton";

export default function PopToTopAppBar({navigation}: NativeStackHeaderProps) {
  return (
    <AppBar.Container>
      <AppBar.Header>
        <AppBar.Left marginLeft={24}>
          <AppBarButton.HistoryBack navigation={navigation} />
        </AppBar.Left>
        <AppBar.Right marginRight={24}>
          <AppBarButton.Cancel navigation={navigation} />
        </AppBar.Right>
      </AppBar.Header>
    </AppBar.Container>
  );
}

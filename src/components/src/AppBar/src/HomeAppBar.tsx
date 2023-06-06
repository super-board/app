import React from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";

import {SVG} from "@/assets/svgs";

import {AppBar} from "./AppBar";
import {AppBarButton} from "./AppBarButton";

export default function HomeAppBar({navigation}: NativeStackHeaderProps) {
  return (
    <AppBar.Container>
      <AppBar.Header>
        <AppBar.Left marginLeft={24}>
          <SVG.Logo.Text width={127} height={15} />
        </AppBar.Left>
        <AppBar.Right marginRight={24} gap={16}>
          <AppBarButton.Notifications navigation={navigation} />
        </AppBar.Right>
      </AppBar.Header>
    </AppBar.Container>
  );
}

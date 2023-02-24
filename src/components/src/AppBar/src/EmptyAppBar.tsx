import React from "react";

import {NativeStackHeaderProps} from "@react-navigation/native-stack";

import {AppBar} from "./AppBar";

export default function EmptyAppBar({navigation}: NativeStackHeaderProps) {
  return (
    <AppBar.Container>
      <AppBar.Header />
    </AppBar.Container>
  );
}

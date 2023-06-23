import React from "react";

import {ScrollView} from "react-native";

import {SizedBox, TermsAndConditionsDocument} from "@/components";
import style from "@/constants/style";

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <SizedBox height={24} />
      <TermsAndConditionsDocument />
    </ScrollView>
  );
}

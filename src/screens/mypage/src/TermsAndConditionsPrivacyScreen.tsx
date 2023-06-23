import React from "react";

import {ScrollView} from "react-native";

import {PrivacyDocument, SizedBox} from "@/components";
import style from "@/constants/style";

export default function TermsAndConditionsPrivacyScreen() {
  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <SizedBox height={24} />
      <PrivacyDocument />
    </ScrollView>
  );
}

import React from "react";

import {ScrollView, Text} from "react-native";

import {SizedBox} from "@/components";
import officialDocuments from "@/constants/officialDocuments";
import style from "@/constants/style";
import typography from "@/constants/typography";

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={style.screenWithAppBarContainer}>
      <SizedBox height={24} />
      <Text style={[typography.body02, typography.textWhite]}>
        {officialDocuments.termsAndConditions.content}
      </Text>
    </ScrollView>
  );
}

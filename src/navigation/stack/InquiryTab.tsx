import React from "react";

import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {StyleProp, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {MyPageMyInquiriesScreen, MyPageNewInquiryScreen} from "@/screens/mypage";

import {MyPageInquiryTabParamList} from "../navigation";

const Tab = createMaterialTopTabNavigator<MyPageInquiryTabParamList>();

export default function InquiryTab() {
  return (
    <Tab.Navigator initialRouteName="MyPageNewInquiryScreen">
      <Tab.Screen
        name="MyPageNewInquiryScreen"
        options={{
          tabBarLabel: "문의하기",
          tabBarLabelStyle: typography.subhead01 as StyleProp<ViewStyle>,
          tabBarStyle: {
            borderBottomColor: colors.OTBBlack400,
            borderBottomWidth: 1,
          },
          tabBarIndicatorStyle: {backgroundColor: colors.white},
          tabBarIndicatorContainerStyle: {backgroundColor: colors.OTBBlack},
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.OTBBlack400,
        }}
        component={MyPageNewInquiryScreen}
      />
      <Tab.Screen
        name="MyPageMyInquiriesScreen"
        options={{
          tabBarLabel: "문의 내역 확인",
          tabBarLabelStyle: typography.subhead01 as StyleProp<ViewStyle>,
          tabBarStyle: {
            borderBottomColor: colors.OTBBlack400,
            borderBottomWidth: 1,
          },
          tabBarIndicatorStyle: {backgroundColor: colors.white},
          tabBarIndicatorContainerStyle: {backgroundColor: colors.OTBBlack},
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.OTBBlack400,
        }}
        component={MyPageMyInquiriesScreen}
      />
    </Tab.Navigator>
  );
}

import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

import colors from "@/constants/colors";

export const stackScreenOptions = {
  animation: "slide_from_right",
  headerShown: true,
} as NativeStackNavigationOptions;

export const bottomTabScreenOptions = {
  headerShown: false,
  tabBarStyle: {
    height: 80,
    backgroundColor: colors.OTBBlack,
    borderTopWidth: 0,
  },
  tabBarItemStyle: {
    paddingVertical: 14,
  },
  tabBarLabelStyle: {},
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.white,
  tabBarInactiveTintColor: colors.white,
} as BottomTabNavigationOptions;

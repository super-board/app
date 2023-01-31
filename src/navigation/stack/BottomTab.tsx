import * as React from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import * as SVG from "@/assets/svgs";
import {bottomTabScreenOptions} from "@/navigation/config";

import HomeStack from "./src/HomeStack";
import MyPageStack from "./src/MyPageStack";
import SearchStack from "./src/SearchStack";
import WriteStack from "./src/WriteStack";

const Tab = createBottomTabNavigator();

const HomeTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.HomeAccent width={32} height={32} />
  ) : (
    <SVG.Icon.Home width={32} height={32} />
  );

const SearchTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.SpaceDashboardAccent width={32} height={32} />
  ) : (
    <SVG.Icon.SpaceDashboard width={32} height={32} />
  );

const WriteTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.EditNoteAccent width={32} height={32} />
  ) : (
    <SVG.Icon.EditNote width={32} height={32} />
  );

const MyPageTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.AccountCircleAccent width={32} height={32} />
  ) : (
    <SVG.Icon.AccountCircle width={32} height={32} />
  );

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={bottomTabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({focused}) => HomeTabIcon(focused),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="SearchTab"
        options={{
          tabBarIcon: ({focused}) => SearchTabIcon(focused),
        }}
        component={SearchStack}
      />
      <Tab.Screen
        name="WriteTab"
        options={{
          tabBarIcon: ({focused}) => WriteTabIcon(focused),
        }}
        component={WriteStack}
      />
      <Tab.Screen
        name="MyPageTab"
        options={{
          tabBarIcon: ({focused}) => MyPageTabIcon(focused),
        }}
        component={MyPageStack}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

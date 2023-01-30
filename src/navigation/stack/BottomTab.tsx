import * as React from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeStack from "./src/HomeStack";
import MyPageStack from "./src/MyPageStack";
import SearchStack from "./src/SearchStack";
import WriteStack from "./src/WriteStack";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="WriteTab" component={WriteStack} />
      <Tab.Screen name="MypageTab" component={MyPageStack} />
    </Tab.Navigator>
  );
};

export default BottomTab;

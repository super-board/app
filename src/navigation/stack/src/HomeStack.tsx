import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {HomeAppBar, SimpleAppBar} from "@/components";
import {stackScreenOptions} from "@/navigation/config";
import {HomeTabParamList} from "@/navigation/navigation";
import {HomeScreen, NotificationsScreen} from "@/screens/home";

const Stack = createNativeStackNavigator<HomeTabParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="HomeScreen" options={{header: HomeAppBar}} component={HomeScreen} />
        <Stack.Screen
          name="NotificationsScreen"
          options={{header: SimpleAppBar, title: "알림", headerBackVisible: true}}
          component={NotificationsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

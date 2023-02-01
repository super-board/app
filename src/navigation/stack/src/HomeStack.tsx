import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {HomeAppBar, NotificationsAppBar} from "@/components";
import {stackScreenOptions} from "@/navigation/config";
import {HomeScreen, NotificationsScreen} from "@/screens/home";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="HomeScreen" options={{header: HomeAppBar}} component={HomeScreen} />
        <Stack.Screen
          name="NotificationsScreen"
          options={{header: NotificationsAppBar}}
          component={NotificationsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;

import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {SimpleAppBar} from "@/components";
import {stackScreenOptions} from "@/navigation/config";
import {WriteTabParamList} from "@/navigation/navigation";
import {WriteScreen} from "@/screens/write";

const Stack = createNativeStackNavigator<WriteTabParamList>();

export default function WriteStack() {
  return (
    <Stack.Navigator initialRouteName="WriteScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen
          name="WriteScreen"
          options={{header: SimpleAppBar, title: "리뷰"}}
          component={WriteScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

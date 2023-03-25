import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {stackScreenOptions} from "@/navigation/config";
import {WriteTabParamList} from "@/navigation/navigation";
import WriteScreen from "@/screens/write/Main";

const Stack = createNativeStackNavigator<WriteTabParamList>();

export default function WriteStack() {
  return (
    <Stack.Navigator initialRouteName="WriteScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="WriteScreen" component={WriteScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

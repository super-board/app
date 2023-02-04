import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {stackScreenOptions} from "@/navigation/config";
import WriteScreen from "@/screens/write/Main";

const Stack = createNativeStackNavigator();

const WriteStack = () => {
  return (
    <Stack.Navigator initialRouteName="Write" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="Write" component={WriteScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WriteStack;

import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {HomeAppBar} from "@/components/src/AppBar";
import {stackScreenOptions} from "@/navigation/config";
import HomeScreen from "@/screens/home/Main";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="Home" options={{header: HomeAppBar}} component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;

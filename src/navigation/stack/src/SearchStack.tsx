import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {SearchAppBar} from "@/components";
import {stackScreenOptions} from "@/navigation/config";
import {SearchTabParamList} from "@/navigation/navigation";
import {SearchScreen} from "@/screens/search";

const Stack = createNativeStackNavigator<SearchTabParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen
          name="SearchScreen"
          options={{header: SearchAppBar}}
          component={SearchScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

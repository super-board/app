import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {SearchAppBar} from "@/components/src/AppBar";
import {stackScreenOptions} from "@/navigation/config";
import SearchScreen from "@/screens/search/src/SearchScreen";

const Stack = createNativeStackNavigator();

export default function RecommendationStack() {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="Search" options={{header: SearchAppBar}} component={SearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

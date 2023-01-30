import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {stackScreenOptions} from "@/navigation/config";
import SearchScreen from "@/screens/search/Main";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchStack;

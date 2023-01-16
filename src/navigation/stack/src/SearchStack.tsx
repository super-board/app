import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import screenOptions from "@/navigation/config";
import SearchScreen from "@/screens/search/Main";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={screenOptions}>
      <Stack.Group>
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchStack;

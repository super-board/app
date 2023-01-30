import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {RecommendationAppBar} from "@/components";
import {stackScreenOptions} from "@/navigation/config";
import {RecommendationScreen, SearchScreen} from "@/screens/search";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="RecommendationScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen
          name="RecommendationScreen"
          options={{header: RecommendationAppBar}}
          component={RecommendationScreen}
        />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchStack;

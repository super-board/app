import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../../screens/search/Main';
import screenOptions from '../config';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName='Search' screenOptions={screenOptions}>
      <Stack.Group>
        <Stack.Screen name='Search' component={SearchScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchStack;
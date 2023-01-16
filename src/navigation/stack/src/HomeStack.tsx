import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screenOptions from '@/navigation/config';
import HomeScreen from '@/screens/home/Main';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;

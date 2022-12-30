import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WriteScreen from 'screens/write/Main';
import screenOptions from 'navigation/config';

const Stack = createNativeStackNavigator();

const WriteStack = () => {
  return (
    <Stack.Navigator initialRouteName="Write" screenOptions={screenOptions}>
      <Stack.Group>
        <Stack.Screen name="Write" component={WriteScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WriteStack;

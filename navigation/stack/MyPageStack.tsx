import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPageScreen from '../../screens/mypage/Main';
import screenOptions from '../config';

const Stack = createNativeStackNavigator();

const MyPageStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage" screenOptions={screenOptions}>
      <Stack.Group>
        <Stack.Screen name="MyPage" component={MyPageScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MyPageStack;

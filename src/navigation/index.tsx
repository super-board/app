import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';

import colors from '@/constants/colors';
import {EnterPassword, FindPassword, Login} from '@/screens/mypage';

import {
  RegisterEmail,
  RegisterPassword,
  RegisterProfile,
} from '../screens/register';
import screenOptions from './config';
import BottomTab from './stack/BottomTab';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="FindPassword" component={FindPassword} />
            <Stack.Screen name="EnterPassword" component={EnterPassword} />

            <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
            <Stack.Screen
              name="RegisterPassword"
              component={RegisterPassword}
            />
            <Stack.Screen name="RegisterProfile" component={RegisterProfile} />
            <Stack.Screen name="Home" component={BottomTab} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;

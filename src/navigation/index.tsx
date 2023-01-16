import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenOptions from './config';
import BottomTab from './stack/BottomTabk';

import { RegisterEmail, RegisterPassword, RegisterProfile } from "../screens/register"
import { FindPassword, Login, EnterPassword } from '@/screens/mypage';
import colors from '@/constants/colors';
import { View } from 'react-native';

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
            <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
            <Stack.Screen name="RegisterProfile" component={RegisterProfile} />
            <Stack.Screen name="Home" component={BottomTab} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    
  );
};

export default Navigation;

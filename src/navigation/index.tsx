import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import HomeStack from './stack/HomeStack';
import MyPageStack from './stack/MyPageStack';
import SearchStack from './stack/SearchStack';
import WriteStack from './stack/WriteStack';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="MypageTab" component={MyPageStack} />
        <Tab.Screen name="SearchTab" component={SearchStack} />
        <Tab.Screen name="WriteTab" component={WriteStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

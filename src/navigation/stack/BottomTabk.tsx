import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPageStack from './src/MyPageStack';
import SearchStack from './src/SearchStack';
import WriteStack from './src/WriteStack';
import HomeStack from './src/HomeStack';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="MypageTab" component={MyPageStack} />
      <Tab.Screen name="SearchTab" component={SearchStack} />
      <Tab.Screen name="WriteTab" component={WriteStack} />
    </Tab.Navigator>
  );
};

export default BottomTab;

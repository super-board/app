import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPageStack from './MyPageStack';
import SearchStack from './SearchStack';
import WriteStack from './WriteStack';
import HomeStack from './HomeStack';

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

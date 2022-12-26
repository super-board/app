import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stack/HomeStack';
import MyPageStack from './stack/MyPageStack';
import SearchStack from './stack/SearchStack';
import WriteStack from './stack/WriteStack';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='Mypage' component={MyPageStack} />
        <Tab.Screen name='Search' component={SearchStack} />
        <Tab.Screen name='Write' component={WriteStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
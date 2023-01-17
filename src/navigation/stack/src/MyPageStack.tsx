import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import screenOptions from "@/navigation/config";
import MyPageScreen from "@/screens/mypage/Main";

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

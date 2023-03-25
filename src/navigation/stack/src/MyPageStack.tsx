import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {MyPageAppBar} from "@/components";
import {stackScreenOptions} from "@/navigation/config";
import {MyPageTabParamList} from "@/navigation/navigation";
import {MyPageMainScreen} from "@/screens/mypage";

const Stack = createNativeStackNavigator<MyPageTabParamList>();

export default function MyPageStack() {
  return (
    <Stack.Navigator initialRouteName="MyPageMainScreen" screenOptions={stackScreenOptions}>
      <Stack.Group>
        <Stack.Screen
          name="MyPageMainScreen"
          options={{header: MyPageAppBar}}
          component={MyPageMainScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

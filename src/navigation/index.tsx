import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, View} from "react-native";

import colors from "@/constants/colors";
import {useCheckOnboardingCompleted} from "@/hooks/onboarding";
import screenOptions from "@/navigation/config";
import {Login} from "@/screens/mypage";
import {SplashScreen} from "@/screens/splash";

import {
  RegisterEmail,
  RegisterNickname,
  RegisterPassword,
  RegisterProfile,
} from "../screens/register";
import OnboardingWelcomeScreen from "./../screens/onboarding/src/OnboardingWelcomeScreen";
import BottomTab from "./stack/BottomTab";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isLoading, shouldRequestOnboarding} = useCheckOnboardingCompleted();

  if (isLoading) return <SplashScreen />;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={shouldRequestOnboarding ? "OnboardingWelcomeScreen" : "Home"}
          screenOptions={screenOptions}>
          <Stack.Group>
            <Stack.Screen name="OnboardingWelcomeScreen" component={OnboardingWelcomeScreen} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
            <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
            <Stack.Screen name="RegisterProfile" component={RegisterProfile} />
            <Stack.Screen name="RegisterNickname" component={RegisterNickname} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Home" component={BottomTab} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
  },
});

export default Navigation;

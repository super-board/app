import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {LoginAppBar, OnboardingAppBar, RegisterAppBar} from "@/components/src/AppBar";
import colors from "@/constants/colors";
import {useCheckOnboardingCompleted} from "@/hooks/onboarding";
import {Login} from "@/screens/mypage";
import {
  OnboardingRecommendationScreen,
  OnboardingTagSelectScreen,
  OnboardingWelcomeScreen,
} from "@/screens/onboarding";
import {
  RegisterEmail,
  RegisterNickname,
  RegisterPassword,
  RegisterProfile,
} from "@/screens/register";
import {SplashScreen} from "@/screens/splash";

import {stackScreenOptions} from "./config";
import BottomTab from "./stack/BottomTab";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isLoading, shouldRequestOnboarding} = useCheckOnboardingCompleted();
  const insets = useSafeAreaInsets();

  if (isLoading) return <SplashScreen />;

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={shouldRequestOnboarding ? "OnboardingWelcomeScreen" : "Home"}
          screenOptions={stackScreenOptions}>
          <Stack.Group>
            <Stack.Screen
              name="OnboardingWelcomeScreen"
              options={{headerShown: false}}
              component={OnboardingWelcomeScreen}
            />
            <Stack.Screen
              name="OnboardingTagSelectScreen"
              options={{header: OnboardingAppBar}}
              component={OnboardingTagSelectScreen}
            />
            <Stack.Screen
              name="OnboardingRecommendationScreen"
              options={{header: OnboardingAppBar}}
              component={OnboardingRecommendationScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Login" options={{header: LoginAppBar}} component={Login} />
            <Stack.Screen
              name="RegisterEmail"
              options={{header: RegisterAppBar}}
              component={RegisterEmail}
            />
            <Stack.Screen
              name="RegisterPassword"
              options={{header: RegisterAppBar}}
              component={RegisterPassword}
            />
            <Stack.Screen
              name="RegisterProfile"
              options={{header: RegisterAppBar}}
              component={RegisterProfile}
            />
            <Stack.Screen
              name="RegisterNickname"
              options={{header: RegisterAppBar}}
              component={RegisterNickname}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Home" options={{headerShown: false}} component={BottomTab} />
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

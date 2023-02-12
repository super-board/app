import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {
  LoginAppBar,
  OnboardingAppBar,
  RegisterAppBar,
  ReviewAppBar,
  SearchAppBar,
} from "@/components";
import colors from "@/constants/colors";
import {useCheckOnboardingCompleted} from "@/hooks/onboarding";
import {LoginScreen} from "@/screens/mypage";
import {
  OnboardingRecommendationScreen,
  OnboardingTagSelectScreen,
  OnboardingWelcomeScreen,
} from "@/screens/onboarding";
import {
  RegisterEmailVerificationScreen,
  RegisterNicknameSettingScreen,
  RegisterPasswordSettingScreen,
  RegisterProfileSelectionScreen,
  RegisterTagSelectScreen,
  RegisterTermsAndConditionsScreen,
} from "@/screens/register";
import {SearchScreen} from "@/screens/search";
import {SplashScreen} from "@/screens/splash";
import {WriteScreen} from "@/screens/write";

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
          initialRouteName={shouldRequestOnboarding ? "OnboardingWelcomeScreen" : "BottomTabView"}
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
            <Stack.Screen
              name="LoginScreen"
              options={{header: LoginAppBar}}
              component={LoginScreen}
            />
            <Stack.Screen
              name="RegisterEmailVerificationScreen"
              options={{header: RegisterAppBar}}
              component={RegisterEmailVerificationScreen}
            />
            <Stack.Screen
              name="RegisterPasswordSettingScreen"
              options={{header: RegisterAppBar}}
              component={RegisterPasswordSettingScreen}
            />
            <Stack.Screen
              name="RegisterProfileSelectionScreen"
              options={{header: RegisterAppBar}}
              component={RegisterProfileSelectionScreen}
            />
            <Stack.Screen
              name="RegisterNicknameSettingScreen"
              options={{header: RegisterAppBar}}
              component={RegisterNicknameSettingScreen}
            />
            <Stack.Screen
              name="RegisterTagSelectScreen"
              options={{header: RegisterAppBar}}
              component={RegisterTagSelectScreen}
            />
            <Stack.Screen
              name="RegisterTermsAndConditionsScreen"
              options={{header: RegisterAppBar}}
              component={RegisterTermsAndConditionsScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="BottomTabView"
              options={{headerShown: false}}
              component={BottomTab}
            />
            <Stack.Screen
              name="SearchScreen"
              options={{header: SearchAppBar}}
              component={SearchScreen}
            />
            <Stack.Screen
              name="WriteScreen"
              options={{header: ReviewAppBar, animation: "slide_from_bottom"}}
              component={WriteScreen}
            />
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

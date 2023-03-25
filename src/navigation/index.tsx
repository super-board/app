import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {
  BadgeAppBar,
  BoardGameDetailsAppBar,
  EmptyAppBar,
  HistoryBackOnlyAppBar,
  OnboardingAppBar,
  RegisterAppBar,
  ReviewAppBar,
  SearchAppBar,
} from "@/components";
import colors from "@/constants/colors";
import {useCheckOnboardingCompleted} from "@/hooks/onboarding";
import {BoardGameDetailsScreen} from "@/screens/boardgame";
import {LoginScreen, MyPageBadgeScreen, MyPageEditProfileScreen} from "@/screens/mypage";
import EditProfileScreen from "@/screens/mypage/src/EditProfileScreen";
import {
  OnboardingRecommendationScreen,
  OnboardingTagSelectScreen,
  OnboardingWelcomeScreen,
} from "@/screens/onboarding";
import {PermissionGrantNoticeScreen, PermissionGrantRequestScreen} from "@/screens/permission";
import {
  RegisterEmailVerificationScreen,
  RegisterNicknameSettingScreen,
  RegisterPasswordSettingScreen,
  RegisterProfileSelectionScreen,
  RegisterTagSelectScreen,
  RegisterTermsAndConditionsScreen,
  ResetPasswordEmailVerificationScreen,
  ResetPasswordSettingScreen,
} from "@/screens/register";
import {SearchScreen} from "@/screens/search";
import {SplashScreen} from "@/screens/splash";
import {WriteScreen} from "@/screens/write";

import {stackScreenOptions} from "./config";
import BottomTab from "./stack/BottomTab";

export type RootStackParamList = {
  OnboardingWelcomeScreen: undefined;
  OnboardingTagSelectScreen: undefined;
  OnboardingRecommendationScreen: undefined;
  LoginScreen: undefined;
  RegisterEmailVerificationScreen: undefined;
  RegisterPasswordSettingScreen: {email?: string};
  RegisterProfileSelectionScreen: {email?: string; password?: string};
  RegisterNicknameSettingScreen: {email?: string; password?: string; profileCharacter?: string};
  RegisterTagSelectScreen: {
    email?: string;
    password?: string;
    profileCharacter?: string;
    nickname?: string;
  };
  RegisterTermsAndConditionsScreen: {
    email?: string;
    password?: string;
    profileCharacter?: string;
    nickname?: string;
    tagIds?: number[];
  };
  ResetPasswordEmailVerificationScreen: undefined;
  ResetPasswordSettingScreen: {email?: string};
  PermissionGrantNoticeScreen: undefined;
  PermissionGrantRequestScreen: undefined;
  BottomTabView: undefined;
  SearchScreen: undefined;
  WriteScreen: undefined;
  BoardGameDetailsScreen: {id: number};
  MyPageEditProfileScreen: undefined;
  MyPageBadgeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
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
              options={{header: HistoryBackOnlyAppBar}}
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
            <Stack.Screen
              name="ResetPasswordEmailVerificationScreen"
              options={{header: RegisterAppBar}}
              component={ResetPasswordEmailVerificationScreen}
            />
            <Stack.Screen
              name="ResetPasswordSettingScreen"
              options={{header: RegisterAppBar}}
              component={ResetPasswordSettingScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="PermissionGrantNoticeScreen"
              options={{header: EmptyAppBar}}
              component={PermissionGrantNoticeScreen}
            />
            <Stack.Screen
              name="PermissionGrantRequestScreen"
              options={{header: HistoryBackOnlyAppBar}}
              component={PermissionGrantRequestScreen}
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
            <Stack.Screen
              name="BoardGameDetailsScreen"
              options={{header: BoardGameDetailsAppBar}}
              component={BoardGameDetailsScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="MyPageEditProfileScreen"
              options={{header: EditProfileScreen}}
              component={MyPageEditProfileScreen}
            />
            <Stack.Screen
              name="MyPageBadgeScreen"
              options={{header: BadgeAppBar}}
              component={MyPageBadgeScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OTBBlack,
  },
});

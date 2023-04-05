import React, {useCallback} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {
  BackToHomeAppBar,
  EmptyAppBar,
  ManagerAppBar,
  PopToSecondTopAppBar,
  PopToTopAppBar,
  SearchAppBar,
  SimpleAppBar,
} from "@/components";
import colors from "@/constants/colors";
import {useLogin} from "@/hooks/common";
import {useCheckOnboardingCompleted} from "@/hooks/onboarding";
import InquiryTab from "@/navigation/stack/InquiryTab";
import {BoardGameDetailsScreen} from "@/screens/boardgame";
import {Inquiry, Manager, Notice, User} from "@/screens/manager";
import {
  LoginScreen,
  MyPageBadgeScreen,
  MyPageEditProfileScreen,
  MyPageFavoriteBoardGamesScreen,
  MyPageMyReviewsScreen,
  MyPageNoticeScreen,
  MyPageNotificationSettingsScreen,
  MyPageSettingsScreen,
} from "@/screens/mypage";
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
import {RootStackParamList} from "./navigation";
import BottomTab from "./stack/BottomTab";
import Tabs from "./tab";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const {isLoading, shouldRequestOnboarding} = useCheckOnboardingCompleted();
  const {shouldLogin} = useLogin();
  const insets = useSafeAreaInsets();

  const initialRouteName = useCallback(() => {
    if (shouldLogin) return "LoginScreen";
    if (shouldRequestOnboarding) return "OnboardingWelcomeScreen";
    return "BottomTabView";
  }, [shouldLogin, shouldRequestOnboarding]);

  if (isLoading) return <SplashScreen />;

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName()} screenOptions={stackScreenOptions}>
          <Stack.Group>
            <Stack.Screen
              name="OnboardingWelcomeScreen"
              options={{headerShown: false}}
              component={OnboardingWelcomeScreen}
            />
            <Stack.Screen
              name="OnboardingTagSelectScreen"
              options={{header: PopToTopAppBar}}
              component={OnboardingTagSelectScreen}
            />
            <Stack.Screen
              name="OnboardingRecommendationScreen"
              options={{header: PopToTopAppBar}}
              component={OnboardingRecommendationScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="LoginScreen"
              options={{header: SimpleAppBar, headerBackVisible: false}}
              component={LoginScreen}
            />
            <Stack.Screen
              name="RegisterEmailVerificationScreen"
              options={{header: PopToSecondTopAppBar}}
              component={RegisterEmailVerificationScreen}
            />
            <Stack.Screen
              name="RegisterPasswordSettingScreen"
              options={{header: PopToSecondTopAppBar}}
              component={RegisterPasswordSettingScreen}
            />
            <Stack.Screen
              name="RegisterProfileSelectionScreen"
              options={{header: PopToSecondTopAppBar}}
              component={RegisterProfileSelectionScreen}
            />
            <Stack.Screen
              name="RegisterNicknameSettingScreen"
              options={{header: PopToSecondTopAppBar}}
              component={RegisterNicknameSettingScreen}
            />
            <Stack.Screen
              name="RegisterTagSelectScreen"
              options={{header: PopToSecondTopAppBar}}
              component={RegisterTagSelectScreen}
            />
            <Stack.Screen
              name="RegisterTermsAndConditionsScreen"
              options={{header: PopToSecondTopAppBar}}
              component={RegisterTermsAndConditionsScreen}
            />
            <Stack.Screen
              name="ResetPasswordEmailVerificationScreen"
              options={{header: PopToSecondTopAppBar}}
              component={ResetPasswordEmailVerificationScreen}
            />
            <Stack.Screen
              name="ResetPasswordSettingScreen"
              options={{header: PopToSecondTopAppBar}}
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
              options={{header: SimpleAppBar, headerBackVisible: true}}
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
              options={{
                header: SimpleAppBar,
                title: "리뷰",
                animation: "slide_from_bottom",
                headerBackVisible: true,
              }}
              component={WriteScreen}
            />
            <Stack.Screen
              name="BoardGameDetailsScreen"
              options={{header: BackToHomeAppBar}}
              component={BoardGameDetailsScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="ManagerScreen"
              component={Manager}
              options={{header: ManagerAppBar}}
            />
            <Stack.Screen
              name="ManageNoticeScreen"
              component={Notice}
              options={{header: ManagerAppBar}}
            />
            <Stack.Screen
              name="ManageInquiryScreen"
              component={Inquiry}
              options={{header: ManagerAppBar}}
            />
            <Stack.Screen
              name="ManageTabScreen"
              component={Tabs}
              options={{header: ManagerAppBar}}
            />
            <Stack.Screen
              name="ManageUserScreen"
              component={User}
              options={{header: ManagerAppBar}}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="MyPageEditProfileScreen"
              options={{header: SimpleAppBar, title: "프로필 수정", headerBackVisible: true}}
              component={MyPageEditProfileScreen}
            />
            <Stack.Screen
              name="MyPageBadgeScreen"
              options={{header: SimpleAppBar, title: "내 뱃지", headerBackVisible: true}}
              component={MyPageBadgeScreen}
            />
            <Stack.Screen
              name="MyPageMyReviewsScreen"
              options={{header: SimpleAppBar, title: "내 리뷰", headerBackVisible: true}}
              component={MyPageMyReviewsScreen}
            />
            <Stack.Screen
              name="MyPageFavoriteBoardGamesScreen"
              options={{
                header: SimpleAppBar,
                title: "보드게임 좋아요 목록",
                headerBackVisible: true,
              }}
              component={MyPageFavoriteBoardGamesScreen}
            />
            <Stack.Screen
              name="MyPageNoticeScreen"
              options={{header: SimpleAppBar, title: "공지사항", headerBackVisible: true}}
              component={MyPageNoticeScreen}
            />
            <Stack.Screen
              name="MyPageInquiryTab"
              options={{header: SimpleAppBar, title: "1:1문의", headerBackVisible: true}}
              component={InquiryTab}
            />
            <Stack.Screen
              name="MyPageSettingsScreen"
              options={{header: SimpleAppBar, title: "설정", headerBackVisible: true}}
              component={MyPageSettingsScreen}
            />
            <Stack.Screen
              name="MyPageNotificationSettingsScreen"
              options={{header: SimpleAppBar, title: "알림", headerBackVisible: true}}
              component={MyPageNotificationSettingsScreen}
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

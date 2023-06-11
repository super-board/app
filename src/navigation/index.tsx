import React, {useCallback} from "react";

import {DarkTheme, NavigationContainer} from "@react-navigation/native";
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
import InquiryTab from "@/navigation/stack/InquiryTab";
import {BoardGameDetailsScreen} from "@/screens/boardgame";
import {Inquiry, Manager, Notice, User} from "@/screens/manager";
import {
  LoginScreen,
  MyPageBadgeScreen,
  MyPageCheckPasswordScreen,
  MyPageEditProfileCharacterScreen,
  MyPageEditProfileScreen,
  MyPageFavoriteBoardGamesScreen,
  MyPageMyReviewsScreen,
  MyPageNoticeScreen,
  MyPageNotificationSettingsScreen,
  MyPageSettingsScreen,
  MyPageTermsAndConditionsListScreen,
  MyPageTermsAndConditionsPrivacyScreen,
  MyPageTermsAndConditionsScreen,
  MyPageUpdatePasswordScreen,
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
import {useOnboardingStore} from "@/zustand-stores";
import useAuthStore from "@/zustand-stores/src/useAuthStore";

import {stackScreenOptions} from "./config";
import {RootStackParamList} from "./navigation";
import BottomTab from "./stack/BottomTab";
import Tabs from "./tab";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const [didAppInitialized, setDidAppInitialized] = React.useState(false);
  const {shouldRequestOnboarding} = useOnboardingStore();
  const {shouldLogin} = useAuthStore();
  const insets = useSafeAreaInsets();

  const initialRouteName = useCallback(() => {
    if (shouldLogin) return "LoginScreen";
    if (shouldRequestOnboarding) return "OnboardingWelcomeScreen";
    return "BottomTabView";
  }, [shouldLogin, shouldRequestOnboarding]);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDidAppInitialized(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (!didAppInitialized) return <SplashScreen />;

  return (
    <View style={[styles.container, {paddingTop: insets.top, backgroundColor: colors.OTBBlack}]}>
      <NavigationContainer
        theme={{...DarkTheme, colors: {...DarkTheme.colors, background: colors.OTBBlack}}}>
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
              name="OnboardingLoginScreen"
              options={{header: SimpleAppBar, headerBackVisible: true}}
              component={LoginScreen}
            />
            <Stack.Screen
              name="RegisterEmailVerificationScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={RegisterEmailVerificationScreen}
            />
            <Stack.Screen
              name="RegisterPasswordSettingScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={RegisterPasswordSettingScreen}
            />
            <Stack.Screen
              name="RegisterProfileSelectionScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={RegisterProfileSelectionScreen}
            />
            <Stack.Screen
              name="RegisterNicknameSettingScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={RegisterNicknameSettingScreen}
            />
            <Stack.Screen
              name="RegisterTagSelectScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={RegisterTagSelectScreen}
            />
            <Stack.Screen
              name="RegisterTermsAndConditionsScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={RegisterTermsAndConditionsScreen}
            />
            <Stack.Screen
              name="ResetPasswordEmailVerificationScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
              component={ResetPasswordEmailVerificationScreen}
            />
            <Stack.Screen
              name="ResetPasswordSettingScreen"
              options={{header: shouldLogin ? PopToTopAppBar : PopToSecondTopAppBar}}
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
              options={{header: SearchAppBar, animation: "slide_from_bottom"}}
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
              name="MyPageEditProfileCharacterScreen"
              options={{header: SimpleAppBar, headerBackVisible: true}}
              component={MyPageEditProfileCharacterScreen}
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
              name="MyPageCheckPasswordScreen"
              options={{header: SimpleAppBar, title: "비밀번호 변경", headerBackVisible: true}}
              component={MyPageCheckPasswordScreen}
            />
            <Stack.Screen
              name="MyPageUpdatePasswordScreen"
              options={{header: SimpleAppBar, title: "비밀번호 변경", headerBackVisible: true}}
              component={MyPageUpdatePasswordScreen}
            />
            <Stack.Screen
              name="MyPageNotificationSettingsScreen"
              options={{header: SimpleAppBar, title: "알림", headerBackVisible: true}}
              component={MyPageNotificationSettingsScreen}
            />
            <Stack.Screen
              name="MyPageTermsAndConditionsListScreen"
              options={{header: SimpleAppBar, title: "정책 및 약관", headerBackVisible: true}}
              component={MyPageTermsAndConditionsListScreen}
            />
            <Stack.Screen
              name="MyPageTermsAndConditionsPrivacyScreen"
              options={{header: SimpleAppBar, title: "개인정보 처리방침", headerBackVisible: true}}
              component={MyPageTermsAndConditionsPrivacyScreen}
            />
            <Stack.Screen
              name="MyPageTermsAndConditionsScreen"
              options={{header: SimpleAppBar, title: "이용약관", headerBackVisible: true}}
              component={MyPageTermsAndConditionsScreen}
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

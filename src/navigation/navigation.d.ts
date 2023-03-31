import {NavigationProp, NavigatorScreenParams} from "@react-navigation/native";

import {RootStackParamList} from "@/navigation";

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
  BottomTabView: NavigatorScreenParams<RootTabParamList>;
  SearchScreen: undefined;
  BoardGameDetailsScreen: {id: number};
  MyPageEditProfileScreen: undefined;
  MyPageBadgeScreen: undefined;
  WriteScreen: undefined;
  MyPageMyReviewsScreen: undefined;
  MyPageFavoriteBoardGamesScreen: undefined;
  MyPageNoticeScreen: undefined;
  MyPageInquiryTab: NavigatorScreenParams<MyPageInquiryTabParamList>;
  MyPageSettingsScreen: undefined;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  RecommendationTab: NavigatorScreenParams<RecommendationTabParamList>;
  WriteTab: NavigatorScreenParams<WriteTabParamList>;
  SearchTab: NavigatorScreenParams<SearchTabParamList>;
  MyPageTab: NavigatorScreenParams<MyPageTabParamList>;
};

export type HomeTabParamList = {
  HomeScreen: undefined;
  NotificationsScreen: undefined;
};

export type RecommendationTabParamList = {
  RecommendationScreen: undefined;
};

export type WriteTabParamList = {
  WriteScreen: undefined;
};

export type SearchTabParamList = {
  SearchScreen: undefined;
};

export type MyPageTabParamList = {
  MyPageMainScreen: undefined;
};

export type MyPageInquiryTabParamList = {
  MyPageNewInquiryScreen: undefined;
  MyPageMyInquiriesScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

import * as React from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Dimensions, Pressable, Text} from "react-native";

import {SVG} from "@/assets/svgs";
import typography from "@/constants/typography";
import {bottomTabScreenOptions} from "@/navigation/config";
import {RootStackParamList, RootTabParamList} from "@/navigation/navigation";

import HomeStack from "./src/HomeStack";
import MyPageStack from "./src/MyPageStack";
import RecommendationStack from "./src/RecommendationStack";
import SearchStack from "./src/SearchStack";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={bottomTabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({focused}) => HomeTabIcon(focused),
          tabBarLabel: ({focused}) => StyledLabel(focused, "홈"),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="RecommendationTab"
        options={{
          tabBarIcon: ({focused}) => RecommendationTabIcon(focused),
          tabBarLabel: ({focused}) => StyledLabel(focused, "둘러보기"),
        }}
        component={RecommendationStack}
      />
      <Tab.Screen
        name="WriteTab"
        options={{
          tabBarButton: WriteTabButton,
        }}
        component={NullTab}
      />
      <Tab.Screen
        name="SearchTab"
        options={{
          tabBarIcon: ({focused}) => SearchTabIcon(focused),
          tabBarLabel: ({focused}) => StyledLabel(focused, "검색"),
        }}
        component={SearchStack}
      />
      <Tab.Screen
        name="MyPageTab"
        options={{
          tabBarIcon: ({focused}) => MyPageTabIcon(focused),
          tabBarLabel: ({focused}) => StyledLabel(focused, "마이페이지"),
        }}
        component={MyPageStack}
      />
    </Tab.Navigator>
  );
}

const HomeTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.HomeAccent width={32} height={32} />
  ) : (
    <SVG.Icon.Home width={32} height={32} />
  );

const RecommendationTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.SpaceDashboardAccent width={32} height={32} />
  ) : (
    <SVG.Icon.SpaceDashboard width={32} height={32} />
  );

const WriteTabButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {width} = Dimensions.get("window");

  return (
    <Pressable
      style={{
        width: width / 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("WriteScreen")}>
      <SVG.Icon.Write width={32} height={32} />
      <Text style={[typography.caption, typography.textWhite]}>글쓰기</Text>
    </Pressable>
  );
};

const SearchTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.SearchAccent width={32} height={32} />
  ) : (
    <SVG.Icon.Search width={32} height={32} />
  );

const MyPageTabIcon = (focused: boolean) =>
  focused ? (
    <SVG.Icon.AccountCircleAccent width={32} height={32} />
  ) : (
    <SVG.Icon.AccountCircle width={32} height={32} />
  );

const StyledLabel = (focused: boolean, label: string) =>
  focused ? (
    <Text style={[typography.subhead03, typography.textWhite]}>{label}</Text>
  ) : (
    <Text style={[typography.caption, typography.textWhite]}>{label}</Text>
  );

const NullTab = () => null;

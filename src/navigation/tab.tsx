import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import {Comment, Report, Review} from "@/screens/manager";

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: [typography.subhead01, {color: colors.white}],
        tabBarStyle: {backgroundColor: colors.OTBBlack},
        tabBarIndicatorStyle: {
          height: 2,
          backgroundColor: colors.white,
        },
      }}>
      <Tab.Screen
        name="ManageReviewScreen"
        component={Review}
        options={{tabBarLabel: "리뷰관리"}}
      />
      <Tab.Screen
        name="ManageCommentScreen"
        component={Comment}
        options={{tabBarLabel: "댓글관리"}}
      />
      <Tab.Screen
        name="ManageReportScreen"
        component={Report}
        options={{tabBarLabel: "신고관리"}}
      />
    </Tab.Navigator>
  );
}

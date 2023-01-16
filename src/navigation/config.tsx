import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

import colors from "@/constants/colors";

const screenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_right",
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    color: colors.background,
  },
  headerTintColor: "#fff",
  headerBackTitleVisible: false,
};

export default screenOptions;

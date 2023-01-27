import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

import colors from "@/constants/colors";

const screenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_right",
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.OTBBlack,
  },
  headerTitleStyle: {
    color: colors.OTBBlack,
  },
  headerTintColor: colors.white,
  headerBackTitleVisible: false,
};

export default screenOptions;

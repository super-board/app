import {Dimensions, StyleSheet} from "react-native";

import colors from "@/constants/colors";

const APP_BAR_HEIGHT = 56;
const style = StyleSheet.create({
  screenWithAppBarContainer: {
    backgroundColor: colors.OTBBlack,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - APP_BAR_HEIGHT,
    padding: 24,
    paddingTop: 0,
  },
  screenWithoutAppBarContainer: {
    backgroundColor: colors.OTBBlack,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    padding: 24,
    paddingTop: 0,
  },
});

export default style;
